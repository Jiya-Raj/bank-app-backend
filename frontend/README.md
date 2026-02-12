# In-House Bank Frontend (Angular 18)

## Run

```bash
npm install
npm start
```

Backend base URL is configured in `src/environments/environment.ts` as `http://localhost:8080`.

## Implemented

- JWT login/logout with `localStorage`
- HTTP interceptor attaching bearer token
- Role based guards (`MANAGER`, `CLERK`)
- Manager screens: dashboard, account creation, account listing, approval queue view, transaction history (paginated), clerk management placeholder (no backend API exposed)
- Clerk screens: dashboard, deposit, withdrawal with approval-aware messaging, transaction history (paginated)
- Black/white/gray inline-styled Bootstrap UI
