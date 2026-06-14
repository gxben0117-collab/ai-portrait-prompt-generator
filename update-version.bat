@echo off
REM 版本更新腳本 (Windows PowerShell 版本)
REM 使用方法: update-version.bat [patch|minor|major] "更新說明"

setlocal enabledelayedexpansion

set VERSION_TYPE=%1
set UPDATE_MESSAGE=%2

if "%VERSION_TYPE%"=="" set VERSION_TYPE=patch
if "%UPDATE_MESSAGE%"=="" set UPDATE_MESSAGE=常規更新

echo 🔄 開始版本更新流程...
echo.

REM 讀取當前版本
for /f "tokens=*" %%i in ('node -p "require('./package.json').version"') do set CURRENT_VERSION=%%i
echo 📌 當前版本: v%CURRENT_VERSION%

REM 計算新版本
if "%VERSION_TYPE%"=="patch" (
    for /f "tokens=*" %%i in ('node -p "const v='%CURRENT_VERSION%'.split('.'); v[2]=(parseFloat(v[2])+0.01).toFixed(2); v.join('.');"') do set NEW_VERSION=%%i
) else if "%VERSION_TYPE%"=="minor" (
    for /f "tokens=*" %%i in ('node -p "const v='%CURRENT_VERSION%'.split('.'); v[1]=(parseFloat(v[1])+0.1).toFixed(1); v[2]='0'; v.join('.');"') do set NEW_VERSION=%%i
) else if "%VERSION_TYPE%"=="major" (
    for /f "tokens=*" %%i in ('node -p "const v='%CURRENT_VERSION%'.split('.'); v[0]=(parseInt(v[0])+1).toString(); v[1]='0'; v[2]='0'; v.join('.');"') do set NEW_VERSION=%%i
) else (
    echo ❌ 錯誤: 版本類型必須是 patch, minor 或 major
    exit /b 1
)

echo 🆕 新版本: v%NEW_VERSION%
echo.

REM 更新 package.json
echo 📝 更新 package.json...
call npm version %NEW_VERSION% --no-git-tag-version

echo.
echo ⚠️  請手動更新 CHANGELOG.md 頂部新增：
echo.
echo ## [%NEW_VERSION%] - %date:~0,10%
echo.
echo ### 🔧 優化
echo - %UPDATE_MESSAGE%
echo.
echo ---
echo.
pause

REM 構建
echo.
echo 🔨 開始構建...
call npm run build

if errorlevel 1 (
    echo ❌ 構建失敗
    exit /b 1
)

echo.
echo ✅ 構建成功
echo.

REM Git 操作
echo 📦 提交代碼...
git add .
git commit -m "v%NEW_VERSION%: %UPDATE_MESSAGE%"
git tag "v%NEW_VERSION%"

echo.
echo 🎉 版本更新完成！
echo.
echo 📋 摘要:
echo   舊版本: v%CURRENT_VERSION%
echo   新版本: v%NEW_VERSION%
echo   更新說明: %UPDATE_MESSAGE%
echo.
echo 🚀 下一步操作:
echo   1. 推送代碼: git push origin master --tags
echo   2. 部署網站: git subtree push --prefix dist origin gh-pages
echo.
pause
