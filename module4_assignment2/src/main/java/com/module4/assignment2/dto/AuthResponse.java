package com.module4.assignment2.dto;

public record AuthResponse(String token, String tokenType, long expiresInSeconds) {
}
