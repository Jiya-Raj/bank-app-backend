package com.app.service;

import java.util.List;

import com.app.dto.AccountRequestDto;
import com.app.dto.AccountResponseDto;

public interface AccountService {
	public List<AccountResponseDto> getAll();

	public AccountResponseDto getByAccountNumber(String accountNumber);

	public AccountResponseDto createAccount(AccountRequestDto account);

	public void deleteAccount(String accountNumber);

	public AccountResponseDto updateAccount(String accountNumber, AccountRequestDto account);

}
