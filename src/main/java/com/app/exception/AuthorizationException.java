package com.app.exception;

public class AuthorizationException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = -270307945772548700L;

	public AuthorizationException(String message) {
		super(message);
	}
}