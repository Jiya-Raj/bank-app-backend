package com.app.exception;

public class TransactionNotFoundException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1367045251368582908L;

	public TransactionNotFoundException(String message) {
		super(message);
	}
}
