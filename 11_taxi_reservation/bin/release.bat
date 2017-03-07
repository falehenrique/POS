@echo off
cd ..
call npm install

set PROJECT=
for %%* in (.) do set PROJECT=%%~n*
echo -Release for: %PROJECT%
echo.
echo.

echo Releasing a new version!
echo.
echo.
echo --Building...
call grunt release
if NOT %errorlevel%==0 GOTO BUILD_ERROR
echo.
echo.

echo --Done!
GOTO DONE

:MISSING_VERSION
echo.
echo.
echo ERROR: package.json must have a new version!
GOTO DONE

:BUILD_ERROR
echo.
echo.
echo ERROR: Error building release!
GOTO DONE

:DONE
echo.
echo.
pause