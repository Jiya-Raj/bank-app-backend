package com.app.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class SecurityUtil {
	private SecurityUtil() {
	}

	public static String getCurrentUsername() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		if (auth == null || !auth.isAuthenticated()) {
			return null;
		}

		Object principal = auth.getPrincipal();

		if (principal instanceof UserDetails userDetails) {
			return userDetails.getUsername();
		}

		return principal.toString();
	}

	public static boolean hasRole(String role) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		return auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_" + role));
	}
}