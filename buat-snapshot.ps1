$root = (Get-Location).Path
$out = Join-Path $root "SNAPSHOT-PROYEK.md"
$utf8 = New-Object System.Text.UTF8Encoding($false)
$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("# SNAPSHOT PROYEK rental-cinta-riau ($(Get-Date -Format 'yyyy-MM-dd HH:mm'))")
$lines.Add("")
$lines.Add("## Struktur folder src")
$lines.Add('```')
(cmd /c "tree src /F /A") | ForEach-Object { $lines.Add([string]$_) }
$lines.Add('```')

$ext = @('.ts','.tsx','.js','.jsx','.css','.sql','.json','.mjs')
$files = New-Object System.Collections.Generic.List[object]
foreach ($dir in @('src','supabase')) {
  $d = Join-Path $root $dir
  if (Test-Path -LiteralPath $d) {
    Get-ChildItem -LiteralPath $d -Recurse -File | Where-Object { $ext -contains $_.Extension } | ForEach-Object { $files.Add($_) }
  }
}
foreach ($n in @('package.json','next.config.ts','next.config.mjs','next.config.js','middleware.ts','proxy.ts','tsconfig.json')) {
  $p = Join-Path $root $n
  if (Test-Path -LiteralPath $p) { $files.Add((Get-Item -LiteralPath $p)) }
}

$seen = @{}
foreach ($f in ($files | Sort-Object FullName)) {
  if ($seen.ContainsKey($f.FullName)) { continue }
  $seen[$f.FullName] = $true
  if ($f.Name -like '.env*') { continue }
  $rel = $f.FullName.Substring($root.Length + 1)
  $lang = $f.Extension.TrimStart('.')
  $lines.Add("")
  $lines.Add("### FILE: $rel")
  $lines.Add('```' + $lang)
  foreach ($l in [System.IO.File]::ReadAllLines($f.FullName)) { $lines.Add($l) }
  $lines.Add('```')
}
[System.IO.File]::WriteAllLines($out, $lines, $utf8)

$bocor = Select-String -LiteralPath $out -Pattern 'eyJ[A-Za-z0-9_\-]{20,}','Mid-server-','sb_secret_'
if ($bocor) {
  Write-Host "PERINGATAN: ada teks mirip KEY di snapshot. Hapus dulu sebelum dikirim!" -ForegroundColor Red
  $bocor | Select-Object LineNumber, Line
} else {
  Write-Host "Aman: tidak ditemukan pola key." -ForegroundColor Green
}
Write-Host "Selesai: $out"