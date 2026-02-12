package com.app.util.mapper;

import com.app.dto.AccountRequestDto;
import com.app.dto.AccountResponseDto;
import com.app.entities.Account;

public class AccountMapper {

	public static AccountResponseDto toResponse(Account account) {
		AccountResponseDto responseDto = new AccountResponseDto();

		responseDto.setName(account.getName());
		responseDto.setAccountNumber(account.getAccountNumber());
		responseDto.setBalance(account.getBalance());
		return responseDto;
	}

	public static Account toRequest(AccountRequestDto requestDto) {
		Account account = new Account();
		account.setName(requestDto.getName());
		account.setBalance(requestDto.getInitialBalance());
		return account;
	}
}
