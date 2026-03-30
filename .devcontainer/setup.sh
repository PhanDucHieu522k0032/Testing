#!/usr/bin/env bash
# Runs once when the Codespace container is first created.
set -euo pipefail

echo "==> Setting up backend (FastAPI + Alembic)"
cd apps/api
python -m venv .venv
source .venv/bin/activate
pip install --quiet --upgrade pip
pip install --quiet -r requirements.txt

# Copy example env if .env does not already exist.
if [ ! -f .env ]; then
  cp .env.example .env
  echo "  Created apps/api/.env from .env.example"
fi

# Run migrations so the SQLite DB is ready on first open.
alembic upgrade head
echo "  Migrations applied."
cd ../..

echo "==> Setting up frontend (Next.js)"
cd apps/web
npm install --silent
cd ../..

echo "==> All done!  Run 'make dev-api' and 'make dev-web' to start."
