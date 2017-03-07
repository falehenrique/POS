@echo off
cd ..
call npm install

set PROJECT=
for %%* in (.) do set PROJECT=%%~n*
echo -Build for: %PROJECT%
echo.
echo.

echo Build, Test and Lint
echo.
echo.
echo -- Runing Build task
echo.
call grunt build
echo.
echo.
cd bin\
pause