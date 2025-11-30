@echo off
echo ========================================
echo Surplus Food Management - Installation
echo ========================================
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
cd ..

echo.
echo Installing Frontend Dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Setup MySQL database (see SETUP_GUIDE.md)
echo 2. Configure backend/.env with your MySQL credentials
echo 3. Run start-backend.bat to start the backend
echo 4. Run start-frontend.bat to start the frontend
echo.
pause
