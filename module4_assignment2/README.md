# Module 4 - Assignment 2 (JWT Authentication & Authorization)

## Features
- `POST /authenticate` for username/password login and JWT generation.
- JWT validation filter for every secured endpoint.
- Role-based method security:
  - `STUDENT` + `TEACHER`: read/create (`GET /resources`, `POST /resources`)
  - `TEACHER` only: delete (`DELETE /resources/{index}`)
- Invalid/expired token returns `401 Unauthorized`.

## Demo Users
- `student1 / student123`
- `teacher1 / teacher123`

## Run
```bash
mvn spring-boot:run
```

## Test
```bash
mvn test
```

## Postman
Import `postman_collection.json`.
