# Clawbot - Deploy to Render
# Run: .\scripts\deploy-to-render.ps1
# Requires: GITHUB_TOKEN and RENDER_API_KEY in .env (or set below)

$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = Split-Path -Parent $scriptDir
Set-Location $rootDir

# Load .env if exists
if (Test-Path ".env") {
    Get-Content ".env" | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
            [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), "Process")
        }
    }
}

$githubToken = $env:GITHUB_TOKEN
$repo = "mukithc/clawbot-money-engine"

# Step 1: Create GitHub repo if not exists
Write-Host "`n[1/3] Checking GitHub repo..." -ForegroundColor Cyan
try { Invoke-RestMethod -Uri "https://api.github.com/repos/$repo" -ErrorAction Stop | Out-Null; $repoExists = $true } catch { $repoExists = $false }
if (-not $repoExists) {
    if (-not $githubToken) {
        Write-Host "GITHUB_TOKEN not set. Create repo manually: https://github.com/new?name=clawbot-money-engine" -ForegroundColor Yellow
        Write-Host "Then run: git push -u origin hubdepot" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "Creating GitHub repo..." -ForegroundColor Green
    $body = @{ name = "clawbot-money-engine"; description = "Affiliate marketing automation"; private = $false } | ConvertTo-Json
    Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers @{ Authorization = "Bearer $githubToken" } -Body $body -ContentType "application/json"
    Write-Host "Repo created." -ForegroundColor Green
} else {
    Write-Host "Repo exists." -ForegroundColor Green
}

# Step 2: Push to GitHub
Write-Host "`n[2/3] Pushing to GitHub..." -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin "https://github.com/$repo.git"
$branch = (git branch --show-current)
git push -u origin $branch
Write-Host "Pushed." -ForegroundColor Green

# Step 3: Render - manual (API doesn't support free tier creation)
Write-Host "`n[3/3] Create Render service:" -ForegroundColor Cyan
Write-Host "  1. https://dashboard.render.com -> New -> Web Service" -ForegroundColor White
Write-Host "  2. Connect GitHub, select: clawbot-money-engine" -ForegroundColor White
Write-Host "  3. Branch: $branch | Build: npm install | Start: npm start" -ForegroundColor White
Write-Host "  4. Add env: ADMIN_PASSWORD, OPENAI_API_KEY" -ForegroundColor White
Write-Host "`nDone! Code is on GitHub. Create Render service at dashboard.render.com" -ForegroundColor Green
