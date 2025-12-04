<#
 PowerShell examples for testing the API endpoints.
 Usage: Open PowerShell, ensure the server is running, then: .\curl_examples.ps1
#>

$Base = $env:BASE
if (-not $Base) { $Base = 'http://localhost:3001/api' }
Write-Output "Base URL: $Base"

Write-Output "`n1) Creating Militar..."
$ts = [DateTime]::UtcNow.Ticks
$email = "joao+$ts@eb.mil.br"
$militarBody = @{ nome = 'Joao Silva'; idade = 25; email = $email; fone = '12999998888' } | ConvertTo-Json
$militar = Invoke-RestMethod -Method Post -Uri "$Base/militar" -ContentType 'application/json' -Body $militarBody
$militar | ConvertTo-Json

Write-Output "`nMilitar ID: $($militar._id)"

Write-Output "`n2) Creating Soldado..."
$cim = Get-Random -Minimum 100000 -Maximum 999999
$soldadoBody = @{ cim = $cim; altura = 1.75; militar = $militar._id } | ConvertTo-Json
$soldado = Invoke-RestMethod -Method Post -Uri "$Base/soldado" -ContentType 'application/json' -Body $soldadoBody
$soldado | ConvertTo-Json

Write-Output "`n3) Creating Patente..."
$patenteBody = @{ codigo = 1; descricao = 'Soldado' } | ConvertTo-Json
$patente = Invoke-RestMethod -Method Post -Uri "$Base/patente" -ContentType 'application/json' -Body $patenteBody
$patente | ConvertTo-Json

Write-Output "`n4) Listing resources..."
Write-Output "Militares:"
Invoke-RestMethod -Uri "$Base/militar" | ConvertTo-Json
Write-Output "`nSoldados:"
Invoke-RestMethod -Uri "$Base/soldado" | ConvertTo-Json
Write-Output "`nPatentes:"
Invoke-RestMethod -Uri "$Base/patente" | ConvertTo-Json

Write-Output "`nExamples to update/delete (edit IDs before running):"
Write-Output "# Update Militar: Invoke-RestMethod -Method Put -Uri '$Base/militar' -ContentType 'application/json' -Body '{\"id\":\"<MILITAR_ID>\",\"nome\":\"Novo Nome\"}'"
Write-Output "# Delete Soldado: Invoke-RestMethod -Method Delete -Uri '$Base/soldado' -ContentType 'application/json' -Body '{\"id\":\"<SOLDADO_ID>\"}'"
