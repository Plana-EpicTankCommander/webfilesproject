using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using Microsoft.Win32;

internal static class Program
{
    private const int Port = 5173;
    private const string EditorUrl = "http://127.0.0.1:5173/map-generator/";
    private static readonly string BaseDir = AppDomain.CurrentDomain.BaseDirectory;
    private static bool noOpen;

    private static int Main()
    {
        try { Console.OutputEncoding = Encoding.UTF8; } catch { }
        Console.Title = "古明地灵殿 · 地图编辑器";
        noOpen = Environment.GetEnvironmentVariable("MAP_EDITOR_NO_OPEN") == "1";

        Console.WriteLine();
        Console.WriteLine("  ==========================================");
        Console.WriteLine("    古明地灵殿 · 地图编辑器");
        Console.WriteLine("  ==========================================");
        Console.WriteLine();

        if (PortInUse())
        {
            Console.WriteLine("  编辑器已在运行，正在打开浏览器...");
            if (!noOpen) OpenUrl();
            return 0;
        }

        string packagedServer = Path.Combine(BaseDir, "server.mjs");
        string bundledNode = Path.Combine(BaseDir, "runtime", "node.exe");
        string editorServer = Path.Combine(BaseDir, "scripts", "editor-server.mjs");

        ProcessStartInfo info;
        if (File.Exists(packagedServer) && File.Exists(bundledNode))
        {
            Environment.SetEnvironmentVariable("MAP_EDITOR_OPEN", "0");
            info = new ProcessStartInfo(bundledNode, "server.mjs");
        }
        else if (File.Exists(editorServer))
        {
            // Source checkout: serve only map-generator and src/map. This does
            // not start the full website Vite server.
            info = new ProcessStartInfo("node.exe", "scripts/editor-server.mjs");
        }
        else
        {
            Console.WriteLine("  [错误] 找不到编辑器文件。");
            Console.WriteLine("  请确认压缩包已完整解压。");
            Pause();
            return 1;
        }

        info.WorkingDirectory = BaseDir;
        info.UseShellExecute = false;
        info.CreateNoWindow = false;

        Console.WriteLine("  正在启动本地服务...");
        Console.WriteLine("  地址: " + EditorUrl);
        Console.WriteLine("  关闭编辑器：在这个窗口按 Ctrl+C");
        Console.WriteLine();

        Process child;
        try
        {
            child = Process.Start(info);
        }
        catch (Exception ex)
        {
            Console.WriteLine("  [错误] 启动失败：" + ex.Message);
            Pause();
            return 1;
        }

        if (child == null)
        {
            Console.WriteLine("  [错误] 启动失败。");
            Pause();
            return 1;
        }

        Thread watcher = new Thread(WaitAndOpen);
        watcher.IsBackground = true;
        watcher.Start();

        child.WaitForExit();
        Console.WriteLine();
        Console.WriteLine("  本地服务已停止。");
        return child.ExitCode;
    }

    private static void WaitAndOpen()
    {
        bool portReady = false;
        for (int i = 0; i < 160; i++)
        {
            bool httpReady = IsReady();
            if (!portReady && PortInUse()) portReady = true;

            // Prefer the real HTTP response, but fall back to an open port after
            // a short grace period (some systems/proxies make the HEAD/GET check
            // unreliable while the browser itself still works).
            if (httpReady || (portReady && i >= 10))
            {
                Console.WriteLine("  本地服务已就绪。");
                if (!noOpen)
                {
                    Console.WriteLine("  正在打开浏览器...");
                    if (!OpenUrl())
                    {
                        Console.WriteLine("  [提示] 浏览器没有自动打开，请手动访问：" + EditorUrl);
                    }
                }
                return;
            }
            Thread.Sleep(300);
        }
        Console.WriteLine("  [提示] 本地服务启动超时，请手动访问：" + EditorUrl);
    }

    private static bool IsReady()
    {
        try
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(EditorUrl);
            request.Method = "GET";
            request.Timeout = 1200;
            request.ReadWriteTimeout = 1200;
            request.AllowAutoRedirect = true;
            request.Proxy = null;
            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            {
                int status = (int)response.StatusCode;
                return status >= 200 && status < 500;
            }
        }
        catch
        {
            return false;
        }
    }

    private static bool PortInUse()
    {
        try
        {
            using (TcpClient client = new TcpClient())
            {
                IAsyncResult result = client.BeginConnect("127.0.0.1", Port, null, null);
                if (!result.AsyncWaitHandle.WaitOne(350)) return false;
                client.EndConnect(result);
                return true;
            }
        }
        catch
        {
            return false;
        }
    }

    private static string FindChrome()
    {
        string[] paths = new string[]
        {
            Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "Google", "Chrome", "Application", "chrome.exe"),
            Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), "Google", "Chrome", "Application", "chrome.exe"),
            Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Google", "Chrome", "Application", "chrome.exe")
        };
        foreach (string path in paths)
        {
            if (File.Exists(path)) return path;
        }
        return null;
    }

    private static string FindEdge()
    {
        string[] paths = new string[]
        {
            Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), "Microsoft", "Edge", "Application", "msedge.exe"),
            Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "Microsoft", "Edge", "Application", "msedge.exe")
        };
        foreach (string path in paths)
        {
            if (File.Exists(path)) return path;
        }
        return null;
    }

    private static string FindChromiumBrowser()
    {
        string progId = "";
        try
        {
            object value = Registry.GetValue(
                @"HKEY_CURRENT_USER\Software\Microsoft\Windows\Shell\Associations\UrlAssociations\http\UserChoice",
                "ProgId",
                ""
            );
            if (value != null) progId = value.ToString().ToLowerInvariant();
        }
        catch { }

        if (progId.Contains("chrome"))
        {
            string chrome = FindChrome();
            if (chrome != null) return chrome;
        }
        if (progId.Contains("edge"))
        {
            string edge = FindEdge();
            if (edge != null) return edge;
        }
        return FindChrome() ?? FindEdge();
    }

    private static bool OpenUrl()
    {
        // Open a dedicated app window so Chrome/Edge does not restore the
        // user's homepage or previous tabs alongside the editor.
        string browser = FindChromiumBrowser();
        if (browser != null)
        {
            try
            {
                string profile = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                    "Hoi4MapEditor",
                    "browser-profile"
                );
                Directory.CreateDirectory(profile);
                ProcessStartInfo app = new ProcessStartInfo(browser);
                app.Arguments =
                    "--app=\"" + EditorUrl + "\" " +
                    "--user-data-dir=\"" + profile + "\" " +
                    "--no-first-run --no-default-browser-check";
                app.UseShellExecute = true;
                Process process = Process.Start(app);
                if (process != null && BringToFront(process)) return true;
                Console.WriteLine("  应用窗口没有出现，尝试默认浏览器...");
            }
            catch { }
        }

        try
        {
            ProcessStartInfo info = new ProcessStartInfo(EditorUrl);
            info.UseShellExecute = true;
            Process process = Process.Start(info);
            if (process != null)
            {
                BringToFront(process);
                return true;
            }
        }
        catch { }

        try
        {
            ProcessStartInfo fallback = new ProcessStartInfo(
                "cmd.exe",
                "/d /s /c start \"\" \"" + EditorUrl + "\""
            );
            fallback.UseShellExecute = false;
            fallback.CreateNoWindow = true;
            Process process = Process.Start(fallback);
            if (process != null) return true;
        }
        catch { }

        try
        {
            ProcessStartInfo fallback = new ProcessStartInfo(
                "rundll32.exe",
                "url.dll,FileProtocolHandler " + EditorUrl
            );
            fallback.UseShellExecute = false;
            fallback.CreateNoWindow = true;
            Process.Start(fallback);
            return true;
        }
        catch
        {
            return false;
        }
    }

    [DllImport("user32.dll")]
    private static extern bool SetForegroundWindow(IntPtr hWnd);

    [DllImport("user32.dll")]
    private static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

    [DllImport("user32.dll")]
    private static extern bool SetWindowPos(
        IntPtr hWnd, IntPtr hWndInsertAfter, int x, int y, int cx, int cy, uint flags
    );

    [DllImport("user32.dll")]
    private static extern void SwitchToThisWindow(IntPtr hWnd, bool altTab);

    [DllImport("user32.dll")]
    private static extern bool AllowSetForegroundWindow(int processId);

    private static readonly IntPtr HWND_TOPMOST = new IntPtr(-1);
    private static readonly IntPtr HWND_NOTOPMOST = new IntPtr(-2);
    private const uint SWP_NOSIZE = 0x0001;
    private const uint SWP_NOMOVE = 0x0002;
    private const uint SWP_SHOWWINDOW = 0x0040;

    private static bool BringToFront(Process process)
    {
        for (int i = 0; i < 50; i++)
        {
            try
            {
                process.Refresh();
                IntPtr handle = process.MainWindowHandle;
                if (handle != IntPtr.Zero)
                {
                    AllowSetForegroundWindow(-1);
                    ShowWindow(handle, 9);
                    SetWindowPos(
                        handle, HWND_TOPMOST, 0, 0, 0, 0,
                        SWP_NOMOVE | SWP_NOSIZE | SWP_SHOWWINDOW
                    );
                    SetForegroundWindow(handle);
                    SwitchToThisWindow(handle, true);
                    SetWindowPos(
                        handle, HWND_NOTOPMOST, 0, 0, 0, 0,
                        SWP_NOMOVE | SWP_NOSIZE | SWP_SHOWWINDOW
                    );
                    return true;
                }
            }
            catch { }
            Thread.Sleep(200);
        }
        return false;
    }

    private static void Pause()
    {
        Console.WriteLine();
        Console.WriteLine("  按回车键退出...");
        Console.ReadLine();
    }
}
