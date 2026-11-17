using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Sockets;
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
        string packageJson = Path.Combine(BaseDir, "package.json");
        string viteCmd = Path.Combine(BaseDir, "node_modules", ".bin", "vite.cmd");

        ProcessStartInfo info;
        if (File.Exists(packagedServer) && File.Exists(bundledNode))
        {
            Environment.SetEnvironmentVariable("MAP_EDITOR_OPEN", "0");
            info = new ProcessStartInfo(bundledNode, "server.mjs");
        }
        else if (File.Exists(packageJson))
        {
            if (!File.Exists(viteCmd))
            {
                Console.WriteLine("  [首次运行] 正在安装依赖，请稍候...");
                ProcessStartInfo install = new ProcessStartInfo("cmd.exe", "/d /s /c \"npm install\"");
                install.WorkingDirectory = BaseDir;
                install.UseShellExecute = false;
                install.CreateNoWindow = false;
                Process installer = Process.Start(install);
                if (installer == null)
                {
                    Console.WriteLine("  [错误] 无法启动 npm install。");
                    Pause();
                    return 1;
                }
                installer.WaitForExit();
                if (installer.ExitCode != 0)
                {
                    Console.WriteLine("  [错误] 依赖安装失败。");
                    Pause();
                    return 1;
                }
            }
            info = new ProcessStartInfo("cmd.exe", "/d /s /c \"npm run dev -- --host 127.0.0.1 --port 5173 --strictPort\"");
        }
        else
        {
            Console.WriteLine("  [错误] 找不到编辑器文件。");
            Console.WriteLine("  请确认压缩包已完整解压，或 node_modules 已安装。");
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
        for (int i = 0; i < 160; i++)
        {
            if (IsReady())
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
                app.UseShellExecute = false;
                app.CreateNoWindow = true;
                Process process = Process.Start(app);
                if (process != null) return true;
            }
            catch { }
        }

        try
        {
            ProcessStartInfo info = new ProcessStartInfo(EditorUrl);
            info.UseShellExecute = true;
            Process process = Process.Start(info);
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

    private static void Pause()
    {
        Console.WriteLine();
        Console.WriteLine("  按回车键退出...");
        Console.ReadLine();
    }
}
