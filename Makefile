.PHONY: help install api web migrate migrate-create db-up db-up-infra

help:  ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ── Backend ──────────────────────────────────────────────────────────────────

install-api:  ## Install Python dependencies
	cd apps/api && python -m venv .venv && .venv/bin/pip install -e ".[dev]"

api:  ## Start FastAPI dev server (port 8000)
	cd apps/api && .venv/bin/uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

migrate:  ## Apply Alembic migrations (alembic upgrade head)
	cd apps/api && .venv/bin/alembic upgrade head

migrate-create:  ## Create a new migration (use: make migrate-create MSG="your message")
	cd apps/api && .venv/bin/alembic revision --autogenerate -m "$(MSG)"

# ── Frontend ─────────────────────────────────────────────────────────────────

install-web:  ## Install Node dependencies
	cd apps/web && npm install

web:  ## Start Next.js dev server (port 3000)
	cd apps/web && npm run dev -- --hostname 0.0.0.0

# ── Install all ──────────────────────────────────────────────────────────────

install: install-api install-web  ## Install all dependencies

# ── Docker (optional) ────────────────────────────────────────────────────────

db-up:  ## Start Postgres via devcontainer compose
	docker compose -f .devcontainer/docker-compose.yml up -d db

db-up-infra:  ## Start Postgres via infra compose
	docker compose -f infra/docker-compose.yml up -d
