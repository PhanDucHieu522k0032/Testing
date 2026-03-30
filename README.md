# Testing

Full-stack monorepo: **FastAPI + Alembic + SQLite** (backend) + **Next.js** (frontend).  
Optimised for GitHub **Codespaces** — no Docker required.

---

## Structure

```
.
├── apps/
│   ├── api/          # FastAPI backend (SQLite via Alembic)
│   └── web/          # Next.js frontend
└── .devcontainer/    # Codespaces / VS Code Dev Container config
```

---

## Running in Codespaces

Open this repo in a Codespace. The `postCreateCommand` in `.devcontainer/devcontainer.json` installs all dependencies automatically.

### 1 — Run the API (Terminal A)

```bash
cd apps/api
alembic upgrade head          # apply DB migrations (creates app.db)
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Test: `curl http://localhost:8000/health` → `{"status":"ok"}`

### 2 — Run the Web frontend (Terminal B)

```bash
cd apps/web
npm run dev -- --hostname 0.0.0.0 --port 3000
```

Open the **Ports** panel → click port **3000** to preview.  
The page fetches `/api/health` (proxied to `localhost:8000`) and shows the API status.

---

## Local setup (without Codespaces)

### API

```bash
cd apps/api
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn main:app --reload --port 8000
```

### Web

```bash
cd apps/web
npm install
npm run dev
```

---

## Tech stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Backend  | FastAPI · Uvicorn · SQLAlchemy 2    |
| Database | SQLite (file `apps/api/app.db`)     |
| Migrations | Alembic                           |
| Frontend | Next.js 14 · TypeScript · Tailwind  |
| Runtime  | Python 3.11 · Node 20               |
