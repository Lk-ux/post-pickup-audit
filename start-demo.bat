@echo off
title CustodyWaste AI - Hackathon Demo Launcher
echo ========================================================
echo   CustodyWaste AI: Post-Pickup Segregation Audit
echo   Digital Chain-of-Custody & Accountability Platform
echo ========================================================
echo.

echo [1/2] Starting Python AI & REST Service (YOLOv8 + OpenCV) on port 5000...
start "CustodyWaste AI Backend" cmd /k "cd /d "%~dp0ai-service" && python app.py"

timeout /t 3 /nobreak >nul

echo [2/2] Starting React + Vite Frontend on port 5173...
start "CustodyWaste AI Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

timeout /t 3 /nobreak >nul

echo Opening browser to http://localhost:5173...
start http://localhost:5173

echo.
echo Demo services launched successfully!
echo Backend:  http://127.0.0.1:5000/api/health
echo Frontend: http://localhost:5173
echo.
pause
