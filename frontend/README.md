# Bank Management Frontend (Angular 18+)

Production-style internal UI scaffold integrating with Spring Boot backend JWT API.

## Run

```bash
npm install
npm run start
```

## API assumptions

- POST `/auth/login`
- GET/POST `/accounts`
- POST `/transactions/deposit`
- POST `/transactions/withdraw`
- GET `/transactions/history/{accountNumber}`
- Manager queue endpoints (if exposed by backend):
  - GET `/transactions/pending`
  - POST `/transactions/{id}/approve`
  - POST `/transactions/{id}/reject`
