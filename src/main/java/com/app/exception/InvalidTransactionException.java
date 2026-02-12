package com.app.exception;

public class InvalidTransactionException extends RuntimeException{
	/**
	 * 
	 */
	private static final long serialVersionUID = -6665286663023949358L;

	public InvalidTransactionException(String message) {
		super(message);
	}
}
