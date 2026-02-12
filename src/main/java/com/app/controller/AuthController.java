package com.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.LoginRequest;
import com.app.dto.LoginResponse;
import com.app.security.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    
	public AuthController(AuthenticationManager authenticationManager,JwtUtil jwtUtil) {
		this.authenticationManager = authenticationManager;
		this.jwtUtil=jwtUtil;
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest requestBody) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(requestBody.getUsername(), requestBody.getPassword()));
		String role = authentication.getAuthorities()
                .iterator()
                .next()
                .getAuthority()
                .replace("ROLE_", ""); 
		String token = jwtUtil.generateToken(
                requestBody.getUsername(),
                role
        );

		
		return ResponseEntity.ok(new LoginResponse(token));
	}
}
