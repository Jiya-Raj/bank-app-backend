package com.app.util.mapper;

import com.app.dto.TransactionResponseDto;
import com.app.entities.Transaction;

public class TransactionMapper {

	public static TransactionResponseDto toResponse(Transaction transaction) {
		TransactionResponseDto dto = new TransactionResponseDto();

		dto.setAccountNumber(transaction.getAccount().getAccountNumber());
		dto.setTransactionType(transaction.getType().name());
		dto.setAmount(transaction.getAmount());
		dto.setStatus(transaction.getStatus().name());
		dto.setCreatedAt(transaction.getCreatedAt());

		return dto;
	}
}
