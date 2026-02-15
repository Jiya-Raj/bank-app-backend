# Module 3 - Assignment 5 (Spring AOP)

This folder contains a **separate Spring Boot application** for Assignment 5, as requested, without modifying the original project code.

## Implemented Requirements

- Added `spring-boot-starter-aop`
- Created AOP package: `com.app.aop`
- Applied AOP only to service layer (`com.app.service.BookService`)
- Implemented:
  - `@Before`
  - `@After`
  - `@AfterReturning`
  - `@AfterThrowing`
  - `@Around`
  - `@Pointcut`
- Added bonus aspects:
  - `args(com.app.dto.BookDto,..)` pointcut
  - `ValidationAspect`
  - `SecurityAspect` with `X-USER` header check
  - Aspect ordering with `@Order`

## Run

```bash
cd module3_assignment5
../mvnw spring-boot:run
```

## Endpoints

- `POST /api/books`
- `GET /api/books/{id}`
- `PUT /api/books/{id}`
- `DELETE /api/books/{id}`
- `GET /api/books`

> Include header `X-USER` for service calls.

## Sample Postman Body (POST /api/books)

```json
{
  "title": "Clean Architecture",
  "author": "Robert C. Martin",
  "price": 650
}
```

## Reflection Answers

1. **Why is AOP preferred over manual logging in every method?**  
   AOP centralizes cross-cutting behavior, avoids duplicated code, and keeps service methods focused on core business flow.

2. **Cross-cutting concerns in enterprise systems**  
   Concerns like logging, security, transactions, auditing, and performance monitoring affect many modules; AOP applies them consistently in one place.

3. **Most powerful annotation and why**  
   `@Around` is most powerful because it can execute code before and after method calls and can control execution flow.

4. **How AOP helps maintain clean code**  
   By separating non-business concerns from business services, classes remain smaller, cleaner, and easier to test.

5. **Would you use AOP for business logic? Why/why not?**  
   No. Business logic should remain explicit in services/controllers. AOP should be limited to technical concerns to avoid hidden behavior and maintenance complexity.
