package com.app.aop;

import com.app.dto.BookDto;
import com.app.exception.InvalidBookException;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(2)
public class ValidationAspect {

    @Before("execution(* com.app.service.BookService.createBook(..)) || execution(* com.app.service.BookService.updateBook(..))")
    public void validateBookPayload(JoinPoint joinPoint) {
        for (Object arg : joinPoint.getArgs()) {
            if (arg instanceof BookDto bookDto) {
                if (bookDto.getTitle() == null || bookDto.getTitle().trim().isEmpty()) {
                    throw new InvalidBookException("Title must not be empty");
                }
                if (bookDto.getPrice() <= 0) {
                    throw new InvalidBookException("Price must be greater than 0");
                }
            }
        }
    }
}
