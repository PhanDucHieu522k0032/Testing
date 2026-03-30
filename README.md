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

| Port | Service          | How to open                       |
|------|------------------|-----------------------------------|
| 8000 | FastAPI backend  | Ports tab → 8000, or `curl`       |
| 3000 | Next.js frontend | Ports tab → 3000 (auto-opens)     |

---

## Manual setup (local machine, no Codespaces)

```bash
# Backend
make install-api
cp apps/api/.env.example apps/api/.env
make migrate          # creates apps/api/crm.db
make dev-api

# Frontend (separate terminal)
make install-web
make dev-web
```

---

## Database migrations (Alembic + SQLite)

| Task                        | Command                                   |
|-----------------------------|-------------------------------------------|
| Apply all pending migrations | `make migrate`                            |
| Create a new migration       | `make migrate-new MSG="add users table"`  |
| View migration history       | `cd apps/api && alembic history`          |

The default `DATABASE_URL` is `sqlite:///./crm.db` (relative to `apps/api/`). To switch to Postgres, set `DATABASE_URL=postgresql+psycopg2://...` in `apps/api/.env` and rerun `make migrate`.

---

## API endpoints

| Method | Path                  | Description           |
|--------|-----------------------|-----------------------|
| GET    | `/health`             | Health check          |
| GET    | `/leads`              | List leads            |
| POST   | `/leads`              | Create lead           |
| GET    | `/leads/{id}`         | Get lead              |
| PUT    | `/leads/{id}`         | Update lead           |
| DELETE | `/leads/{id}`         | Delete lead           |
| GET    | `/customers`          | List customers        |
| POST   | `/customers`          | Create customer       |
| GET    | `/customers/{id}`     | Get customer          |
| PUT    | `/customers/{id}`     | Update customer       |
| DELETE | `/customers/{id}`     | Delete customer       |
| GET    | `/activities`         | List activities       |
| POST   | `/activities`         | Create activity       |
| GET    | `/activities/{id}`    | Get activity          |
| DELETE | `/activities/{id}`    | Delete activity       |

Full interactive docs: **http://localhost:8000/docs**

---

## Frontend → Backend proxy

`apps/web/next.config.ts` rewrites `/api/:path*` to `http://localhost:8000/:path*`, so the frontend can call `/api/health` without CORS issues during development.
