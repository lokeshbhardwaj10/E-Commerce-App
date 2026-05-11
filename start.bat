@echo off
REM Start E-Commerce Application on Windows

echo.
echo ==========================================
echo   E-Commerce MERN Application Starter
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js found: %cd%
echo.

REM Check if backend and frontend directories exist
if not exist "backend" (
    echo ERROR: 'backend' directory not found!
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

if not exist "frontend" (
    echo ERROR: 'frontend' directory not found!
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
echo.

REM Install backend dependencies
echo [1/4] Installing backend dependencies...
cd backend
if not exist "node_modules" (
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install backend dependencies
        cd ..
        pause
        exit /b 1
    )
)
cd ..

echo [2/4] Backend dependencies installed successfully!
echo.

REM Install frontend dependencies
echo [3/4] Installing frontend dependencies...
cd frontend
if not exist "node_modules" (
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install frontend dependencies
        cd ..
        pause
        exit /b 1
    )
)
cd ..

echo [4/4] Frontend dependencies installed successfully!
echo.

echo ==========================================
echo   Starting Application
echo ==========================================
echo.

REM Create two separate terminals for backend and frontend
echo Starting backend server (port 5000)...
echo.
timeout /t 2 /nobreak

REM Start backend in new window
start "E-Commerce Backend" cmd /k "cd backend && npm run dev"

echo Backend started! Waiting for it to initialize...
timeout /t 5 /nobreak

echo.
echo Starting frontend development server (port 3000)...
echo.

REM Start frontend in new window
start "E-Commerce Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ==========================================
echo   Application Started Successfully!
echo ==========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Backend Terminal:  E-Commerce Backend
echo Frontend Terminal: E-Commerce Frontend
echo.
echo Press Ctrl+C in either terminal to stop the server
echo.
echo Demo Credentials:
echo   Admin:  admin@test.com / password123
echo   User:   user@test.com / password123
echo.
echo ==========================================
echo.

pause
