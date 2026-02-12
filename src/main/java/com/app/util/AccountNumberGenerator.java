package com.app.util;

public class AccountNumberGenerator {

	public static String generate() {
		return "ACC" + System.currentTimeMillis();
	}
}
