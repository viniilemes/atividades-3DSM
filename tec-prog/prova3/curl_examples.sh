#!/usr/bin/env bash
set -euo pipefail

# Example curl flows for this project (Bash / Git Bash / WSL)
# Usage: BASE=http://localhost:3001/api ./curl_examples.sh

BASE=${BASE:-http://localhost:3001/api}

echo "Base URL: $BASE"

echo "\n1) Creating Militar..."
MILITAR_JSON=$(curl -s -X POST "$BASE/militar" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Joao Silva","idade":25,"email":"joao+'"$(date +%s)"'@eb.mil.br","fone":"12999998888"}')
echo "$MILITAR_JSON"

MILITAR_ID=$(echo "$MILITAR_JSON" | node -e "const fs=require('fs'); const d=JSON.parse(fs.readFileSync(0,'utf8')); console.log(d._id || d.id || '')")
echo "Militar ID: $MILITAR_ID"

echo "\n2) Creating Soldado (uses the Militar ID)..."
CIM=$((RANDOM+100000))
SOLDADO_JSON=$(curl -s -X POST "$BASE/soldado" \
  -H "Content-Type: application/json" \
  -d "{\"cim\":${CIM},\"altura\":1.75,\"militar\":\"${MILITAR_ID}\"}")
echo "$SOLDADO_JSON"

echo "\n3) Creating Patente..."
PATENTE_JSON=$(curl -s -X POST "$BASE/patente" \
  -H "Content-Type: application/json" \
  -d '{"codigo":1,"descricao":"Soldado"}')
echo "$PATENTE_JSON"

echo "\n4) List resources"
echo "Militares:"
curl -s "$BASE/militar" | sed 's/^/  /'
echo "\nSoldados:"
curl -s "$BASE/soldado" | sed 's/^/  /'
echo "\nPatentes:"
curl -s "$BASE/patente" | sed 's/^/  /'

echo "\nExamples to update/delete (edit IDs before running):"
echo "# Update Militar"
echo "curl -X PUT $BASE/militar -H 'Content-Type: application/json' -d '{\"id\":\"<MILITAR_ID>\",\"nome\":\"Novo Nome\"}'"
echo "# Delete Soldado"
echo "curl -X DELETE $BASE/soldado -H 'Content-Type: application/json' -d '{\"id\":\"<SOLDADO_ID>\"}'"
