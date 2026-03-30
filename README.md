# CRM System — MVP Monorepo

Full-stack CRM starter built with **FastAPI + SQLAlchemy 2.0 + Alembic** (backend) and **Next.js** (frontend), optimised for **GitHub Codespaces** with a no-Docker SQLite fallback.

---

## Repository structure

```
.
├── apps/
│   ├── api/          # FastAPI backend
│   └── web/          # Next.js frontend
├── infra/
│   └── docker-compose.yml  # Optional standalone Postgres
├── .devcontainer/
│   ├── devcontainer.json   # Codespaces config
│   └── docker-compose.yml  # Codespaces Postgres service
├── Makefile
└── README.md
```

---

## Quick start (no Docker — SQLite)

### 1. Backend

```bash
# Create and activate virtual environment
cd apps/api
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate

# Install dependencies
pip install -e ".[dev]"

# Run database migrations (creates crm.db SQLite file)
alembic upgrade head

# Start the API server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Check it: <http://localhost:8000/health>  
Docs: <http://localhost:8000/docs>

### 2. Frontend

```bash
cd apps/web
npm install
npm run dev
```

Open: <http://localhost:3000>  
The page calls `/api/health` (proxied to `http://localhost:8000/health`) and shows the backend status.

---

## Using the Makefile

```bash
make install      # Install all dependencies (API + web)
make api          # Start FastAPI (port 8000)
make web          # Start Next.js (port 3000)
make migrate      # Apply pending Alembic migrations
make migrate-create MSG="add users table"   # Create a new migration
```

---

## GitHub Codespaces

Open the repo in Codespaces — the `.devcontainer/devcontainer.json` installs Python 3.11 and Node 20 automatically and forwards ports 3000, 8000, and 5432.

**With Docker (devcontainer):** Postgres starts automatically as the `db` service in `.devcontainer/docker-compose.yml`. Set the env var:

```bash
export DATABASE_URL=postgresql+psycopg://crm_user:crm_pass@db:5432/crm_db
```

**Without Docker:** the default `DATABASE_URL` uses SQLite — no extra setup needed.

---

## Environment variables (backend)

Copy `apps/api/.env.example` to `apps/api/.env` and adjust:

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | `sqlite:///./crm.db` | SQLAlchemy connection string |
| `DEBUG` | `true` | Enable SQLAlchemy echo |
| `API_TITLE` | `CRM API` | OpenAPI title |
| `API_VERSION` | `0.1.0` | API version string |

For PostgreSQL (when Docker is available):

```bash
DATABASE_URL=postgresql+psycopg://crm_user:crm_pass@localhost:5432/crm_db
```

Then install the psycopg driver: `pip install -e ".[postgres]"`.

---

## Optional: standalone Postgres via Docker

```bash
docker compose -f infra/docker-compose.yml up -d
```

---

## Database models

| Model | Key fields |
|---|---|
| `Lead` | id, name, email, phone, company, status, notes |
| `Customer` | id, name, email, phone, company, address, notes |
| `Activity` | id, title, type, description, lead_id, customer_id |

`Lead.status` enum: `new` · `contacted` · `qualified` · `lost`  
`Activity.type` enum: `call` · `email` · `meeting` · `note` · `task`

---

## Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Backend health check |
| (more coming) | — | Leads, Customers, Activities CRUD |

Interactive docs available at `/docs` when the API is running.
