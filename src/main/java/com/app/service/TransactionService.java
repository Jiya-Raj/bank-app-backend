package com.app.service;

import java.util.List;

import com.app.dto.DepositDto;
import com.app.dto.TransactionResponseDto;
import com.app.dto.WithdrawDto;
import com.app.entities.User;

public interface TransactionService {
	public TransactionResponseDto withdraw(WithdrawDto withdrawDto);

	public TransactionResponseDto deposit(DepositDto depositDto);

	public List<TransactionResponseDto> getTransactionHistory(String accountNumber);

	public TransactionResponseDto approveTransaction(Long transactionId);

}
