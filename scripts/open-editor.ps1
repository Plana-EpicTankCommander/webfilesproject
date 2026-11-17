$ErrorActionPreference = 'SilentlyContinue'
$url = 'http://127.0.0.1:5173/map-generator/'

# Wait until the editor actually answers, not merely until the TCP port opens.
for ($i = 0; $i -lt 120; $i++) {
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 1
        if ($response.StatusCode -eq 200) { break }
    } catch { }
    Start-Sleep -Milliseconds 300
}

if ($env:MAP_EDITOR_NO_OPEN -eq '1') { exit 0 }

$profile = Join-Path $env:LOCALAPPDATA 'Hoi4MapEditor\browser-profile'
New-Item -ItemType Directory -Force -Path $profile | Out-Null

$browsers = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
)

$browser = $null
foreach ($candidate in $browsers) {
    if (Test-Path -LiteralPath $candidate) {
        $browser = $candidate
        break
    }
}

if ($browser) {
    $arguments = @(
        "--app=$url",
        "--user-data-dir=$profile",
        '--no-first-run',
        '--no-default-browser-check'
    )
    Start-Process -FilePath $browser -ArgumentList $arguments
} else {
    Start-Process $url
}
