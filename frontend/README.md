# Portfolio Web (Next.js)

Interactive UX/UI portfolio: a 2D graph you traverse by scrolling or clicking, with a 3D avatar guide.

**Stack:** Next.js 14 (App Router) · React 18 · TypeScript (strict) · @react-three/fiber · CSS Modules

## Run

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
npm run typecheck && npm run lint && npm run build
```

## Content

All content is hard-coded in `src/data/portfolio.ts` (nodes, metrics, positions, tools). Edit that file.

## FastAPI integration

Set `API_URL` (e.g. `https://api.example.com`) and the server component fetches
`GET {API_URL}/api/v1/portfolio` (cached for 5 minutes). The JSON must match `PortfolioData`
in `src/types/portfolio.ts`. If the request fails or the shape is invalid, the app logs an error
and falls back to the hard-coded data, so the site never breaks.

Minimal FastAPI endpoint:

```python
from fastapi import FastAPI
app = FastAPI()

@app.get("/api/v1/portfolio")
def portfolio() -> dict:
    return {...}  # same shape as PortfolioData (camelCase keys)
```

Because the fetch runs on the Next.js server, no CORS configuration is needed.

## Structure

```
src/app            layout, page (server component, loads data)
src/components     PortfolioExperience (client), graph/, avatar/, ui/
src/hooks          useCameraLoop (scroll → camera, no per-frame React renders)
src/lib            graph math, scroll helper, API client
src/data, types    hard-coded content and TypeScript contracts
```

## Notes

- Keyboard accessible: graph nodes are focusable buttons (Enter/Space); a hidden section list is provided for screen readers.
- Respects `prefers-reduced-motion`.
- If WebGL is unavailable the avatar is skipped and the graph keeps working.
