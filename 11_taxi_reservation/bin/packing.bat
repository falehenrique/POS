@echo off
cd ..
call npm install

set PROJECT=
for %%* in (.) do set PROJECT=%%~n*
echo -Packing for: %PROJECT%
echo.
echo.

echo Packing and checking for changes to commit
echo.
echo.
echo --Checking for pending commits...
for /f %%i in ('svn status') do (
	set SVN_STATUS=%%i
)
if NOT "%SVN_STATUS%"=="" GOTO PENDING_COMMIT
echo.
echo.

echo --Exporting folder...
echo cleaning...
rmdir /Q /S "%TMP%\%PROJECT%"
svn export -q . "%TMP%\%PROJECT%"
echo.
echo.

echo --Package
echo cleaning...
del "..\%PROJECT%.zip"
7z a -tzip "..\%PROJECT%.zip" "%TMP%\%PROJECT%"
if NOT %errorlevel%==0 GOTO PACKING_ERROR
echo.
echo.

echo --Done!
GOTO DONE

:PACKING_ERROR
echo.
echo.
echo ERROR: ERROR in packing
GOTO DONE

:PENDING_COMMIT
echo.
echo.
echo ERROR: Tsc tsc tsc, still have commits to do.
GOTO DONE

:DONE
echo.
echo.
pause