.PHONY: help dev-api dev-web migrate migrate-new install-api install-web install

PYTHON = apps/api/.venv/bin/python
UVICORN = apps/api/.venv/bin/uvicorn
ALEMBIC = apps/api/.venv/bin/alembic

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

install-api: ## Install Python dependencies
	cd apps/api && python -m venv .venv && .venv/bin/pip install -q --upgrade pip && .venv/bin/pip install -q -r requirements.txt

install-web: ## Install Node dependencies
	cd apps/web && npm install

install: install-api install-web ## Install all dependencies

migrate: ## Apply all pending Alembic migrations
	cd apps/api && $(ALEMBIC) upgrade head

migrate-new: ## Create a new Alembic migration (usage: make migrate-new MSG="your message")
	cd apps/api && $(ALEMBIC) revision --autogenerate -m "$(MSG)"

dev-api: ## Start FastAPI backend on port 8000 (with hot-reload)
	cd apps/api && $(UVICORN) app.main:app --reload --host 0.0.0.0 --port 8000

dev-web: ## Start Next.js frontend on port 3000
	cd apps/web && npm run dev -- --hostname 0.0.0.0 --port 3000
