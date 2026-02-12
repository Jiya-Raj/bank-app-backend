package com.app.controller;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.app.exception.AuthorizationException;
import com.app.exception.BankAccountNotFoundException;
import com.app.exception.InsufficientBalanceException;
import com.app.exception.InvalidAmountException;
import com.app.exception.InvalidTransactionException;
import com.app.exception.TransactionNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandlerController {

	@ExceptionHandler(BankAccountNotFoundException.class)
	public ResponseEntity<ProblemDetail> handle404(BankAccountNotFoundException e) {
		ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);

		problemDetail.setTitle("Account Not Found");
		problemDetail.setDetail(e.getMessage());
		problemDetail.setProperty("timestamp", Instant.now());
		problemDetail.setProperty("errorCode", "NOT_FOUND");

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(problemDetail);
	}

	@ExceptionHandler(InsufficientBalanceException.class)
	public ResponseEntity<ProblemDetail> handleInsufficientBalance(InsufficientBalanceException e) {
		ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);

		problemDetail.setTitle("Insufficient Balance");
		problemDetail.setDetail(e.getMessage());
		problemDetail.setProperty("timestamp", Instant.now());

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(problemDetail);
	}

	@ExceptionHandler(InvalidAmountException.class)
	public ResponseEntity<ProblemDetail> handleInvalidAmount(InvalidAmountException e) {

		ProblemDetail pd = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);

		pd.setTitle("Invalid Amount");
		pd.setDetail(e.getMessage());
		pd.setProperty("timestamp", Instant.now());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(pd);
	}

	@ExceptionHandler(InvalidTransactionException.class)
	public ResponseEntity<ProblemDetail> handleInvalidTransaction(InvalidTransactionException e) {

		ProblemDetail pd = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);

		pd.setTitle("Invalid Transaction");
		pd.setDetail(e.getMessage());
		pd.setProperty("timestamp", Instant.now());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(pd);
	}

	@ExceptionHandler(TransactionNotFoundException.class)
	public ResponseEntity<ProblemDetail> handleTransactionNotFound(TransactionNotFoundException e) {
		ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);

		problemDetail.setTitle("Transaction Not Found");
		problemDetail.setDetail(e.getMessage());
		problemDetail.setProperty("timestamp", Instant.now());
		problemDetail.setProperty("errorCode", "NOT_FOUND");

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(problemDetail);
	}

	@ExceptionHandler(AuthorizationException.class)
	public ResponseEntity<ProblemDetail> handleAuthorization(AuthorizationException e) {
		ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);
		problemDetail.setTitle("Authentication Failed");
		problemDetail.setDetail("Invalid username or password");
		problemDetail.setProperty("timestamp", Instant.now());
		problemDetail.setProperty("errorCode", "AUTH_FAILED");

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(problemDetail);
	}

}
