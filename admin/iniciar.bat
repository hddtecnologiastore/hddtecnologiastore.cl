@echo off
cd /d "%~dp0"
echo Instalando dependencias...
call npm install
echo.
echo Iniciando Admin de Productos...
echo Abre http://localhost:3000 en tu navegador
echo Presiona Ctrl+C para detener
echo.
node server.js
pause
