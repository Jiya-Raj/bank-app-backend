package com.app.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionResponseDto {

	private String accountNumber;
	private String transactionType; 
	private BigDecimal amount;
	private String status;//string because api go outside and will reveal the enums we have 
	private LocalDateTime createdAt;

}
