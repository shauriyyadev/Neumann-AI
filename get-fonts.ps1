$ErrorActionPreference = "Stop"
$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
$jobs = @(
  @{ name="inter"; css="public/fonts/inter.css"; out=@("inter-latin.woff2") },
  @{ name="playfair"; css="public/fonts/playfair.css"; out=@("playfair-latin.woff2","playfair-italic-latin.woff2") },
  @{ name="jetbrains"; css="public/fonts/jetbrains.css"; out=@("jetbrains-latin.woff2") }
)
foreach ($j in $jobs) {
  $text = Get-Content -Raw -Encoding utf8 $j.css
  $blocks = [regex]::Matches($text, "(?s)/\*\s*([a-z\-]+)\s*\*/\s*@font-face\s*\{(.*?)\}")
  $latin = @()
  foreach ($b in $blocks) {
    if ($b.Groups[1].Value -eq "latin") {
      $body = $b.Groups[2].Value
      $style = if ($body -match "font-style:\s*italic") { "italic" } else { "normal" }
      $url = [regex]::Match($body, "url\((https://[^)]+)\)").Groups[1].Value
      $latin += [pscustomobject]@{ style=$style; url=$url }
    }
  }
  "== $($j.name): $($latin.Count) latin faces"
  $i = 0
  foreach ($f in $latin) {
    $target = $j.out[$i]
    Invoke-WebRequest -UseBasicParsing -Headers @{ "User-Agent" = $ua } -Uri $f.url -OutFile "public/fonts/$target" -TimeoutSec 60
    "  $($f.style) -> $target ($((Get-Item "public/fonts/$target").Length) bytes)"
    $i++
  }
}
