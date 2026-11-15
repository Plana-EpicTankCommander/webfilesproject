@echo off
setlocal
chcp 936 >nul
title 古明地灵殿 · 地图编辑器
cd /d "%~dp0"

echo.
echo  ==========================================
echo    古明地灵殿 · 地图编辑器
echo  ==========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo  [错误] 没有找到 Node.js。
  echo  请先安装 Node.js: https://nodejs.org/
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo  [错误] 没有找到 npm。
  echo  请重新安装 Node.js，或把 npm 加入 PATH。
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\.bin\vite.cmd" (
  echo  [首次运行] 正在安装依赖，请稍候...
  call npm install
  if errorlevel 1 (
    echo.
    echo  [错误] 依赖安装失败。
    pause
    exit /b 1
  )
)

rem 如果 5173 已经被占用，就直接打开已有的编辑器。
powershell -NoProfile -Command "try { $c = New-Object Net.Sockets.TcpClient; $c.Connect('127.0.0.1', 5173); $c.Close(); exit 0 } catch { exit 1 }"
if not errorlevel 1 (
  echo  编辑器已在运行，正在打开浏览器...
  start "" "http://127.0.0.1:5173/map-generator/"
  exit /b 0
)

echo  正在启动本地服务...
echo  地址: http://127.0.0.1:5173/map-generator/
echo  关闭编辑器：在这个窗口按 Ctrl+C
echo.

if /i not "%MAP_EDITOR_NO_OPEN%"=="1" (
  start "" /b powershell -NoProfile -WindowStyle Hidden -Command "$u='http://127.0.0.1:5173/map-generator/'; for ($i=0; $i -lt 60; $i++) { try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 1; if ($r.StatusCode -eq 200) { Start-Process $u; break } } catch {}; Start-Sleep -Milliseconds 500 }"
)

call npm run dev -- --host 127.0.0.1 --port 5173 --strictPort

echo.
echo  本地服务已停止。
if errorlevel 1 (
  echo  如果启动失败，请检查上方错误信息。
  pause
)
endlocal
