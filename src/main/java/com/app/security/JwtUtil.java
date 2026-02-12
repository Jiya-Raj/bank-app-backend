package com.app.security;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
	private final String SECRET = "mySuperSecretKeyForJwtThatIsVerySecureAndLong123";

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());
 
 
 public String generateToken(String username, String role) {

     return Jwts.builder()
             .setSubject(username)
             .claim("role", role)
             .setIssuedAt(new Date(System.currentTimeMillis()))
             .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))
             .signWith(key, SignatureAlgorithm.HS256)
             .compact();
 }

 public String extractUsername(String token) {
     return extractAllClaims(token).getSubject();
 }

 public String extractRole(String token) {
     return extractAllClaims(token).get("role", String.class);
 }

 private Claims extractAllClaims(String token) {
     return Jwts.parserBuilder()
             .setSigningKey(key)
             .build()
             .parseClaimsJws(token)
             .getBody();
 }

 public boolean isTokenValid(String token) {
     try {
         extractAllClaims(token);
         return true;
     } catch (Exception e) {
         return false;
     }
 }
 
}
