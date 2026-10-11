@echo off
title Noore Beauty & Jewels - Local & Mobile Server
cd /d "%~dp0"
echo =========================================================
echo   Starting Noore Beauty & Jewels Store...
echo =========================================================
echo.
echo PC Browser:    http://localhost:3000
echo Mobile (WiFi): http://192.168.100.6:3000
echo =========================================================
echo.
echo Opening PC browser...
start http://localhost:3000
echo Running Next.js server...
npm run dev
pause
