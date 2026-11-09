$root = (Get-Location).Path
if (-not (Test-Path -LiteralPath (Join-Path $root 'package.json')) -or -not (Test-Path -LiteralPath (Join-Path $root 'src'))) {
  Write-Host "SALAH FOLDER. Jalankan dari folder project yang berisi package.json dan folder src." -ForegroundColor Red
  exit
}
$out = Join-Path $root "SNAPSHOT-PROYEK.md"
$utf8 = New-Object System.Text.UTF8Encoding($false)

$extKode = @('.ts','.tsx','.js','.jsx','.mjs','.cjs','.css','.sql','.json','.md')
$files = New-Object System.Collections.Generic.List[object]

# 1. Semua file kode di folder src dan supabase
foreach ($dir in @('src','supabase')) {
  $d = Join-Path $root $dir
  if (Test-Path -LiteralPath $d) {
    Get-ChildItem -LiteralPath $d -Recurse -File |
      Where-Object { $extKode -contains $_.Extension -and $_.FullName -notmatch '\\node_modules\\' -and $_.FullName -notmatch '\\\.next\\' } |
      ForEach-Object { $files.Add($_) }
  }
}

# 2. Semua file kode di folder utama (config, file tes, dll)
Get-ChildItem -LiteralPath $root -File |
  Where-Object { @('.ts','.tsx','.js','.mjs','.cjs') -contains $_.Extension -and $_.Name -ne 'next-env.d.ts' } |
  ForEach-Object { $files.Add($_) }

# 3. File penting lain di folder utama
foreach ($n in @('package.json','tsconfig.json','README.md','CATATAN-STATUS.md','.env.example','.env.local.example')) {
  $p = Join-Path $root $n
  if (Test-Path -LiteralPath $p) { $files.Add((Get-Item -LiteralPath $p -Force)) }
}

# Buang duplikat, urutkan, dan kecualikan file rahasia
$seen = @{}
$final = New-Object System.Collections.Generic.List[object]
foreach ($f in ($files | Sort-Object FullName)) {
  if ($seen.ContainsKey($f.FullName)) { continue }
  $seen[$f.FullName] = $true
  if ($f.Name -like '.env*' -and $f.Name -notlike '*.example') { continue }
  if ($f.Name -eq 'SNAPSHOT-PROYEK.md' -or $f.Name -eq 'package-lock.json') { continue }
  $final.Add($f)
}

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("# SNAPSHOT PROYEK rental-cinta-riau ($(Get-Date -Format 'yyyy-MM-dd HH:mm'))")
$lines.Add("")
$lines.Add("Jumlah file dalam snapshot: $($final.Count)")
$lines.Add("TIDAK termasuk: node_modules, .next, .env.local (rahasia), package-lock.json, gambar/aset di folder public.")
$lines.Add("")
$lines.Add("## Daftar file yang ada di snapshot")
foreach ($f in $final) { $lines.Add("- " + $f.FullName.Substring($root.Length + 1)) }
$lines.Add("")
$lines.Add("## Struktur folder src")
$lines.Add('```')
(cmd /c "tree src /F /A") | ForEach-Object { $lines.Add([string]$_) }
$lines.Add('```')

foreach ($f in $final) {
  $rel = $f.FullName.Substring($root.Length + 1)
  $lang = $f.Extension.TrimStart('.')
  $lines.Add("")
  $lines.Add("### FILE: $rel")
  $lines.Add('```' + $lang)
  foreach ($l in [System.IO.File]::ReadAllLines($f.FullName)) { $lines.Add($l) }
  $lines.Add('```')
}
[System.IO.File]::WriteAllLines($out, $lines, $utf8)

$bocor = Select-String -LiteralPath $out -Pattern 'eyJ[A-Za-z0-9_\-]{20,}','Mid-server-','sb_secret_','sb_publishable_'
if ($bocor) {
  Write-Host "PERINGATAN: ada teks mirip KEY di snapshot. Hapus dulu sebelum dikirim!" -ForegroundColor Red
  $bocor | Select-Object LineNumber, Line
} else {
  Write-Host "Aman: tidak ditemukan pola key." -ForegroundColor Green
}
$ukuranKB = [math]::Round((Get-Item -LiteralPath $out).Length / 1KB)
Write-Host "Jumlah file: $($final.Count) | Ukuran snapshot: $ukuranKB KB"
if ($ukuranKB -gt 1500) { Write-Host "Snapshot cukup besar. Kalau Gemini kesulitan membaca, kirim hanya file yang relevan." -ForegroundColor Yellow }
Write-Host "Selesai: $out"