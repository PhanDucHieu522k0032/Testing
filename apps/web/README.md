# CRM – Web Frontend

Next.js frontend for the MVP CRM system. Proxies `/api/*` to the FastAPI backend.

## Development

```bash
npm install
npm run dev -- --hostname 0.0.0.0 --port 3000
```

Open [http://localhost:3000](http://localhost:3000) to see the CRM dashboard. The page displays the backend health status fetched via `/api/health`.

## Fonts

The app uses system font stacks (no external font dependencies), so it works in restricted network environments like GitHub Codespaces.

## Proxy configuration

`next.config.ts` rewrites `/api/:path*` → `http://localhost:8000/:path*` so the frontend can call the FastAPI backend without CORS issues during development.
