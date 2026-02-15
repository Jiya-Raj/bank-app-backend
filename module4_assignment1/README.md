# Module 4 - Assignment 1

This project is created in a separate folder (`module4_assignment1`) without modifying the original application.

## Implemented requirements

- Spring Security configured with Basic Auth and JWT support.
- In-memory users:
  - `student` / `student123` with role `ROLE_STUDENT`
  - `teacher` / `teacher123` with role `ROLE_TEACHER`
- Method-level authorization using `@PreAuthorize` on service methods:
  - STUDENT + TEACHER can create/read/update books.
  - TEACHER only can delete books.

## API endpoints

- `POST /api/auth/login` -> get JWT token
- `POST /api/books` -> create book
- `GET /api/books` -> list books
- `PUT /api/books/{id}` -> update book
- `DELETE /api/books/{id}` -> delete book (TEACHER only)

Use either Basic Auth headers or Bearer token for protected endpoints.
