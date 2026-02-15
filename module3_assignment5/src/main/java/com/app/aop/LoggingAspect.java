package com.app.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(3)
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Pointcut("execution(* com.app.service.*.*(..))")
    public void serviceMethods() {
    }

    @Before("serviceMethods()")
    public void logBefore(JoinPoint joinPoint) {
        logger.info("Before method: {}", joinPoint.getSignature());
    }

    @After("serviceMethods()")
    public void logAfter(JoinPoint joinPoint) {
        logger.info("After method: {}", joinPoint.getSignature());
    }

    @AfterReturning(value = "execution(* com.app.service.BookService.getBook(..))", returning = "result")
    public void logReturn(Object result) {
        logger.info("Method returned: {}", result);
    }

    @AfterThrowing(value = "serviceMethods()", throwing = "ex")
    public void logException(Exception ex) {
        logger.error("Exception thrown: {}", ex.getMessage());
    }

    @Around("serviceMethods()")
    public Object measureExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long end = System.currentTimeMillis();
        logger.info("Execution Time of {}: {}ms", joinPoint.getSignature(), (end - start));
        return result;
    }

    @Before("args(com.app.dto.BookDto,..)")
    public void logBookDtoAccess() {
        logger.info("BookDto argument detected for service invocation.");
    }
}
