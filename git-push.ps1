# =========================================================
# PVS NexTech — One-Click Git Push Script
# Double-click this file (or run in PowerShell) to
# stage all changes, commit, and push to GitHub.
# =========================================================

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PVS NexTech — Git Push" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Move to the project root (same folder as this script)
Set-Location $PSScriptRoot

# ── 1. Check if there are any changes ─────────────────────
$status = git status --short
if (-not $status) {
    Write-Host "Nothing to commit — your branch is already up to date." -ForegroundColor Green
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 0
}

Write-Host "Changes detected:" -ForegroundColor Yellow
Write-Host $status
Write-Host ""

# ── 2. Stage all changes ───────────────────────────────────
Write-Host "Staging all changes..." -ForegroundColor Yellow
git add -A
Write-Host "  Done" -ForegroundColor Green

# ── 3. Auto-generate commit message ───────────────────────
$timestamp  = Get-Date -Format "yyyy-MM-dd HH:mm"

$added    = (git diff --cached --name-status | Select-String "^A").Count
$modified = (git diff --cached --name-status | Select-String "^M").Count
$deleted  = (git diff --cached --name-status | Select-String "^D").Count

$summary = @()
if ($added    -gt 0) { $summary += "$added added" }
if ($modified -gt 0) { $summary += "$modified modified" }
if ($deleted  -gt 0) { $summary += "$deleted deleted" }
$summaryStr = $summary -join ", "

$commitMsg = "chore: update website [$timestamp] - $summaryStr file(s)"

Write-Host ""
Write-Host "Commit message:" -ForegroundColor Yellow
Write-Host "  $commitMsg" -ForegroundColor White
Write-Host ""

# Allow user to override the commit message
$custom = Read-Host "Press Enter to use this message, or type a custom one"
if ($custom -ne "") {
    $commitMsg = $custom
}

# ── 4. Commit ──────────────────────────────────────────────
Write-Host ""
Write-Host "Committing..." -ForegroundColor Yellow
git commit -m $commitMsg
Write-Host "  Committed" -ForegroundColor Green

# ── 5. Push to GitHub ──────────────────────────────────────
Write-Host ""
Write-Host "Pushing to GitHub (origin/main)..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  All done! Code is live on GitHub." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to exit"
