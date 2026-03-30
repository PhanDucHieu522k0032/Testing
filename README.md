# CRM – Starter Monorepo

A minimal full-stack CRM built with **FastAPI + SQLAlchemy 2 + Alembic** (backend) and **Next.js** (frontend), optimised for development on **GitHub Codespaces without Docker**.

---

## Project layout

```
.
├── apps/
│   ├── api/          FastAPI backend (Python)
│   └── web/          Next.js frontend (TypeScript)
├── .devcontainer/    Codespaces configuration
├── Makefile          Dev-task shortcuts
└── README.md
```

---

## Quick start in GitHub Codespaces

> **No Docker required.** The backend uses SQLite by default.

### 1 – Open in Codespaces

Click **Code → Codespaces → Create codespace on main** (or your branch).

The `postCreateCommand` in `.devcontainer/devcontainer.json` runs `.devcontainer/setup.sh` automatically. It will:
- Create a Python virtual env and install backend dependencies.
- Copy `apps/api/.env.example` → `apps/api/.env`.
- Run `alembic upgrade head` to initialise the SQLite database.
- Run `npm install` for the frontend.

### 2 – Start the backend (port 8000)

Open a terminal in Codespaces and run:

```bash
make dev-api
```

Or manually:

```bash
cd apps/api
source .venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Test it:

```bash
curl http://localhost:8000/health
# → {"status":"ok","service":"crm-api"}
```

The interactive API docs are at **http://localhost:8000/docs**.

### 3 – Start the frontend (port 3000)

Open a second terminal:

```bash
make dev-web
```

Or manually:

```bash
cd apps/web
npm run dev -- --hostname 0.0.0.0 --port 3000
```

Open the **Ports** tab in Codespaces and click the link for port **3000**. You should see the CRM dashboard with a green "Backend Status: ok" indicator.

### Port summary

| Port | Service |
|------|---------|
| 8000 | FastAPI backend (`GET /health`, `/docs`) |
| 3000 | Next.js frontend |

---

## Running migrations

```bash
# Apply all pending migrations
make migrate

# Create a new migration after changing models
make migrate-new MSG="add users table"
```

---

## Switching to PostgreSQL

Change `DATABASE_URL` in `apps/api/.env`:

```env
DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/crm
```

Then run `make migrate` to apply migrations against Postgres.

---

## Available make targets

```bash
make help
```

| Target | Description |
|--------|-------------|
| `install` | Install all dependencies (API + web) |
| `install-api` | Install Python dependencies |
| `install-web` | Install Node dependencies |
| `dev-api` | Start FastAPI on port 8000 (hot-reload) |
| `dev-web` | Start Next.js on port 3000 |
| `migrate` | Apply pending Alembic migrations |
| `migrate-new` | Create a new migration (`MSG="..."`) |