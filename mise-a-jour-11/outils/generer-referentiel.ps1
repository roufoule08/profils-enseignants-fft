# Génère assets/js/data/referentiel.js à partir de referentiel/referentiel-profils-v3.json.
#
# Pourquoi : le site doit lire le référentiel, pas le recopier à la main (CLAUDE.md §4).
# Un fichier .js (et non un fetch du JSON) permet aussi d'ouvrir le site en double-cliquant
# sur index.html, sans serveur.
#
# Utilisation, après chaque modification du JSON :
#   clic droit sur ce fichier > « Exécuter avec PowerShell »
#   ou, dans un terminal : powershell -ExecutionPolicy Bypass -File outils\generer-referentiel.ps1
# Puis ouvrir tests/index.html : tout doit être vert.

$root = Split-Path -Parent $PSScriptRoot
$source = Join-Path $root 'referentiel\referentiel-profils-v3.json'
$target = Join-Path $root 'assets\js\data\referentiel.js'

$json = [IO.File]::ReadAllText($source, [Text.Encoding]::UTF8)
# Vérifie que le JSON est valide avant de l'écrire.
$null = $json | ConvertFrom-Json

$header = @"
/**
 * FICHIER GÉNÉRÉ AUTOMATIQUEMENT : ne pas modifier à la main.
 * Source : referentiel/referentiel-profils-v3.json
 * Pour le mettre à jour : outils/generer-referentiel.ps1
 */
window.App = window.App || {};
window.App.referentiel =
"@

$content = $header.Replace("`r`n", "`n").TrimEnd() + ' ' + $json.Trim() + ";`n"
[IO.File]::WriteAllText($target, $content, (New-Object Text.UTF8Encoding $false))
Write-Host "OK : $target généré depuis $source"
