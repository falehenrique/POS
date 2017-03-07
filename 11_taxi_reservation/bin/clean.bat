@echo off

rem check if rimraf is already installed
for /f %%i in ('rimraf -h') do set STAT=%%i
if NOT "%STAT%"=="" GOTO CLEAN

rem install it if not
echo.
echo Installing rimraf
call npm install rimraf -g

:CLEAN
rem remove node_modules
echo Cleaning node_modules
call rimraf ..\node_modules

rem clean cache
echo Cleaning npm cache
call npm cache clean

echo done!
pause