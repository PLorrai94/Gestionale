@echo off
REM ========================================
REM Aider Launch Scripts for Windows
REM ========================================

REM Check if mode is provided
if "%1"=="" (
    echo.
    echo Usage: aider-launch.bat [mode]
    echo.
    echo Available modes:
    echo   architect  - R1 Architect + V3 Editor (best for complex tasks)
    echo   code       - V3 Chat direct coding (fast, simple tasks)
    echo   ask        - Ask questions without editing
    echo   help       - Get help about aider
    echo   browser    - Run aider in browser mode
    echo.
    goto :end
)

REM Set common options
set COMMON_OPTS=--yes-always --cache-prompts --map-tokens 4096 --dark-mode

if /i "%1"=="architect" (
    echo Starting Aider in ARCHITECT mode (R1 + V3)...
    aider --architect --model deepseek/deepseek-reasoner --editor-model deepseek/deepseek-chat %COMMON_OPTS% %2 %3 %4 %5 %6 %7 %8 %9
    goto :end
)

if /i "%1"=="code" (
    echo Starting Aider in CODE mode (V3 direct)...
    aider --model deepseek/deepseek-chat --edit-format diff %COMMON_OPTS% %2 %3 %4 %5 %6 %7 %8 %9
    goto :end
)

if /i "%1"=="ask" (
    echo Starting Aider in ASK mode (no editing)...
    aider --model deepseek/deepseek-chat --edit-format ask %COMMON_OPTS% %2 %3 %4 %5 %6 %7 %8 %9
    goto :end
)

if /i "%1"=="help" (
    echo Starting Aider in HELP mode...
    aider --model deepseek/deepseek-chat --edit-format help %COMMON_OPTS% %2 %3 %4 %5 %6 %7 %8 %9
    goto :end
)

if /i "%1"=="browser" (
    echo Starting Aider in BROWSER mode...
    aider --architect --model deepseek/deepseek-reasoner --editor-model deepseek/deepseek-chat --gui %COMMON_OPTS% %2 %3 %4 %5 %6 %7 %8 %9
    goto :end
)

echo Unknown mode: %1
echo Use: architect, code, ask, help, or browser

:end
