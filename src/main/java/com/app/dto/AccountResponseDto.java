package com.app.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountResponseDto {
	private String accountNumber;
	private String name;
	private BigDecimal balance;
}
