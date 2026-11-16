using System;
using System.Diagnostics;
using System.IO;
using System.Net.Sockets;
using System.Text;
using System.Threading;

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
        for (int i = 0; i < 120; i++)
        {
            if (PortInUse())
            {
                if (!noOpen) OpenUrl();
                return;
            }
            Thread.Sleep(500);
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

    private static void OpenUrl()
    {
        try
        {
            ProcessStartInfo info = new ProcessStartInfo(EditorUrl);
            info.UseShellExecute = true;
            Process.Start(info);
        }
        catch { }
    }

    private static void Pause()
    {
        Console.WriteLine();
        Console.WriteLine("  按回车键退出...");
        Console.ReadLine();
    }
}
