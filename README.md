# CRM Starter – FastAPI + Next.js (Codespaces + SQLite)

A monorepo skeleton for a CRM application.  
**Backend:** FastAPI · SQLAlchemy 2 · Alembic · SQLite (dev)  
**Frontend:** Next.js 15 (App Router, TypeScript)  
**Dev environment:** GitHub Codespaces (no Docker required)

---

## Repository layout

```
.
├─ .devcontainer/          # Codespaces config (Python 3.11 + Node 20)
├─ apps/
│  ├─ api/                 # FastAPI backend
│  │  ├─ alembic/          # Migrations
│  │  ├─ main.py           # App entry-point + /health endpoint
│  │  ├─ models.py         # SQLAlchemy models (users, leads, customers, activities)
│  │  ├─ database.py       # Engine + session factory
│  │  ├─ settings.py       # Pydantic-settings (reads .env)
│  │  └─ requirements.txt
│  └─ web/                 # Next.js frontend
│     ├─ app/              # App Router pages
│     ├─ next.config.mjs   # Rewrites /api/* → FastAPI
│     └─ package.json
└─ README.md
```

---

## Quick-start in GitHub Codespaces

> All commands are run from the **repo root** unless noted.

### 1 – Backend (FastAPI)

```bash
cd apps/api

# Create & activate virtual environment
python -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy env file (SQLite is the default – no changes needed)
cp .env.example .env

# Run database migrations
alembic upgrade head

# Start the API server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API is now live at **http://localhost:8000**  
Interactive docs: **http://localhost:8000/docs**  
Health check: **http://localhost:8000/health** → `{"status": "ok"}`

### 2 – Frontend (Next.js)

Open a **second terminal**:

```bash
cd apps/web

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Frontend is now live at **http://localhost:3000**  
The home page calls `/api/health` (proxied to FastAPI) and shows the result.

---

## Health-check wiring

`next.config.mjs` rewrites every request from `/api/*` on the Next.js server to the FastAPI server:

```js
rewrites: [{ source: "/api/:path*", destination: "http://localhost:8000/:path*" }]
```

So `fetch("/api/health")` in the browser hits FastAPI's `GET /health` without any CORS issues during development.

---

## Switching to PostgreSQL (optional)

When you have a Postgres instance available, update `apps/api/.env`:

```
DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/crm
```

Then re-run migrations:

```bash
cd apps/api && alembic upgrade head
```

No other code changes are needed.
