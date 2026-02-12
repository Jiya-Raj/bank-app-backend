package com.app.exception;

public class InvalidAmountException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4574961934307970071L;

	public InvalidAmountException(String message) {
		super(message);
	}
}