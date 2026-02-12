# Bank App Frontend (Angular 18+)

Production-structured UI scaffold for internal bank management workflows.

## Run

```bash
cd frontend
npm install
npm start
```

## Backend URL

Configured in `src/environments/environment.ts`.

## API Endpoints Wired to Current Backend

- `POST /auth/login`
- `GET /accounts`
- `POST /accounts`
- `POST /transactions/deposit`
- `POST /transactions/withdraw`
- `GET /transactions/history/{accountNumber}`

## Important Alignment Note

The current backend `TransactionController` does not expose pending/approve/reject APIs.
The manager pending-approval page is intentionally non-actionable until those endpoints are added server-side.
