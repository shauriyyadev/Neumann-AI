$text = Get-Content -Raw -Encoding utf8 "public/fonts/playfair.css"
$blocks = [regex]::Matches($text, "(?s)/\*\s*([a-z\-]+)\s*\*/\s*@font-face\s*\{(.*?)\}")
foreach ($b in $blocks) {
  if ($b.Groups[1].Value -eq "latin") {
    $body = $b.Groups[2].Value
    $style = if ($body -match "font-style:\s*italic") { "italic" } else { "normal" }
    $url = [regex]::Match($body, "url\((https://[^)]+)\)").Groups[1].Value
    "$style $url"
  }
}
