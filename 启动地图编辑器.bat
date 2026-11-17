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

set "NODE="
set "SERVER="
set "HELPER="

if exist "%~dp0server.mjs" if exist "%~dp0runtime\node.exe" (
  set "NODE=%~dp0runtime\node.exe"
  set "SERVER=server.mjs"
)
if not defined SERVER if exist "%~dp0scripts\editor-server.mjs" (
  set "NODE=node"
  set "SERVER=scripts\editor-server.mjs"
)
if exist "%~dp0open-editor.ps1" set "HELPER=%~dp0open-editor.ps1"
if not defined HELPER if exist "%~dp0scripts\open-editor.ps1" set "HELPER=%~dp0scripts\open-editor.ps1"

if not defined SERVER (
  echo  [错误] 找不到编辑器文件。
  echo  请确认压缩包已完整解压，或在仓库根目录运行。
  pause
  exit /b 1
)
if not defined HELPER (
  echo  [错误] 缺少 open-editor.ps1。
  pause
  exit /b 1
)

"%NODE%" --version >nul 2>nul
if errorlevel 1 (
  echo  [错误] 没有找到 Node.js。
  echo  请安装 Node.js 18 或更新版本: https://nodejs.org/
  pause
  exit /b 1
)

rem 如果 5173 已经在监听，直接打开编辑器，不再重复启动服务。
netstat -ano | findstr /R /C:":5173 .*LISTENING" >nul
if not errorlevel 1 (
  echo  编辑器已在运行，正在打开窗口...
  if /i not "%MAP_EDITOR_NO_OPEN%"=="1" powershell -NoProfile -ExecutionPolicy Bypass -File "%HELPER%"
  exit /b 0
)

echo  正在启动编辑器专用服务...
echo  地址: http://127.0.0.1:5173/map-generator/
echo  关闭编辑器：在这个窗口按 Ctrl+C
echo.

if /i not "%MAP_EDITOR_NO_OPEN%"=="1" (
  start "" /b powershell -NoProfile -ExecutionPolicy Bypass -File "%HELPER%"
)

"%NODE%" "%SERVER%"

echo.
echo  本地服务已停止。
if errorlevel 1 (
  echo  如果启动失败，请检查上方错误信息。
  pause
)
endlocal
