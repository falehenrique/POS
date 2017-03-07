@echo off
cd ..
call npm install

set PROJECT=
for %%* in (.) do set PROJECT=%%~n*
echo -Watch for: %PROJECT%
echo.
echo.

echo Starting to Watch changes for automatic generated files
echo.
echo.
call grunt watcher