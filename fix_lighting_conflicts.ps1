# 批量修正 timeOfDay 光線衝突關鍵字
$fixes = @{
    'sunset rooftop' = 'rooftop evening moment'
    'sunset beach' = 'beach evening moment'
    'moonlit night bath' = 'night bath moment'
    'golden hour' = 'romantic ceremony moment'
    'fishing return sunset' = 'fishing return evening'
    'moonlit midnight' = 'midnight intimate moment'
    'gentle moonlit night' = 'gentle night moment'
    'moonlit grooming moment' = 'night grooming moment'
    'pearl curtain moonlit night' = 'pearl curtain night moment'
    'favored moonlit night' = 'favored night moment'
    'moonlit drinking night' = 'drinking night gathering'
    'Paris golden hour' = 'Paris romantic evening'
    'Santorini sunset' = 'Santorini evening moment'
    'sunset golden hour' = 'romantic evening moment'
    'Sahara sunset' = 'Sahara evening journey'
    'golden hour through window' = 'romantic moment through window'
    'moonlit night' = 'night moment'
}

$profilesPath = "C:\AIProjects\002專案進行中\美圖咒語系統\src\profiles"

Get-ChildItem "$profilesPath\*-profiles.json" | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file -Raw -Encoding UTF8
    $modified = $false

    foreach ($old in $fixes.Keys) {
        $new = $fixes[$old]
        $pattern = [regex]::Escape($old)
        if ($content -match $pattern) {
            $content = $content -replace $pattern, $new
            $modified = $true
            Write-Host "  $($_.Name): '$old' -> '$new'"
        }
    }

    if ($modified) {
        $content | Set-Content $file -Encoding UTF8 -NoNewline
        Write-Host "✓ Updated: $($_.Name)" -ForegroundColor Green
    }
}

Write-Host "`n完成！已修正所有光線衝突。"
