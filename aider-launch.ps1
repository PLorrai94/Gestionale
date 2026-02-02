<#
.SYNOPSIS
    Aider Launch Script for PowerShell
.DESCRIPTION
    Launch Aider with different modes optimized for DeepSeek R1 + V3
.PARAMETER Mode
    The mode to run: architect, code, ask, help, browser
.EXAMPLE
    .\aider-launch.ps1 architect
    .\aider-launch.ps1 code myfile.py
#>

param(
    [Parameter(Position=0)]
    [ValidateSet('architect', 'code', 'ask', 'help', 'browser')]
    [string]$Mode,
    
    [Parameter(Position=1, ValueFromRemainingArguments=$true)]
    [string[]]$AdditionalArgs
)

# Common options
$CommonOpts = @(
    '--yes-always'
    '--cache-prompts'
    '--map-tokens', '4096'
    '--dark-mode'
)

function Show-Help {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Aider Launch Script (PowerShell)" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: " -NoNewline
    Write-Host ".\aider-launch.ps1 [mode] [additional-args]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Available modes:"
    Write-Host "  architect" -ForegroundColor Green -NoNewline
    Write-Host "  - R1 Architect + V3 Editor (best for complex tasks)"
    Write-Host "  code" -ForegroundColor Green -NoNewline
    Write-Host "       - V3 Chat direct coding (fast, simple tasks)"
    Write-Host "  ask" -ForegroundColor Green -NoNewline
    Write-Host "        - Ask questions without editing"
    Write-Host "  help" -ForegroundColor Green -NoNewline
    Write-Host "       - Get help about aider"
    Write-Host "  browser" -ForegroundColor Green -NoNewline
    Write-Host "    - Run aider in browser mode"
    Write-Host ""
    Write-Host "Examples:"
    Write-Host "  .\aider-launch.ps1 architect" -ForegroundColor Yellow
    Write-Host "  .\aider-launch.ps1 code myfile.py" -ForegroundColor Yellow
    Write-Host "  .\aider-launch.ps1 ask --read README.md" -ForegroundColor Yellow
    Write-Host ""
}

if (-not $Mode) {
    Show-Help
    exit 0
}

$args = @()

switch ($Mode) {
    'architect' {
        Write-Host "Starting Aider in ARCHITECT mode (R1 + V3)..." -ForegroundColor Green
        $args = @(
            '--architect'
            '--model', 'deepseek/deepseek-reasoner'
            '--editor-model', 'deepseek/deepseek-chat'
        ) + $CommonOpts + $AdditionalArgs
    }
    'code' {
        Write-Host "Starting Aider in CODE mode (V3 direct)..." -ForegroundColor Green
        $args = @(
            '--model', 'deepseek/deepseek-chat'
            '--edit-format', 'diff'
        ) + $CommonOpts + $AdditionalArgs
    }
    'ask' {
        Write-Host "Starting Aider in ASK mode (no editing)..." -ForegroundColor Green
        $args = @(
            '--model', 'deepseek/deepseek-chat'
            '--edit-format', 'ask'
        ) + $CommonOpts + $AdditionalArgs
    }
    'help' {
        Write-Host "Starting Aider in HELP mode..." -ForegroundColor Green
        $args = @(
            '--model', 'deepseek/deepseek-chat'
            '--edit-format', 'help'
        ) + $CommonOpts + $AdditionalArgs
    }
    'browser' {
        Write-Host "Starting Aider in BROWSER mode..." -ForegroundColor Green
        $args = @(
            '--architect'
            '--model', 'deepseek/deepseek-reasoner'
            '--editor-model', 'deepseek/deepseek-chat'
            '--gui'
        ) + $CommonOpts + $AdditionalArgs
    }
}

# Launch aider
& aider @args
