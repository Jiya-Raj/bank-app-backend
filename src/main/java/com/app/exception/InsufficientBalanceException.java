package com.app.exception;

public class InsufficientBalanceException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 5003109820950846726L;

	public InsufficientBalanceException(String accountNumber) {
		super("Insufficient balance for account: " + accountNumber);
	}
}