package com.app.service;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.app.dto.AccountRequestDto;
import com.app.dto.AccountResponseDto;
import com.app.entities.Account;
import com.app.exception.BankAccountNotFoundException;
import com.app.repo.AccountRepo;
import com.app.util.AccountNumberGenerator;
import com.app.util.mapper.AccountMapper;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {

	private AccountRepo accountRepo;

	AccountServiceImpl(AccountRepo accountRepo) {
		this.accountRepo = accountRepo;
	}

	@PreAuthorize("hasAnyRole('CLERK', 'MANAGER')")
	@Override
	public List<AccountResponseDto> getAll() {

		return accountRepo.findAll().stream().map(AccountMapper::toResponse).toList();
	}

	@PreAuthorize("hasAnyRole('CLERK', 'MANAGER')")
	@Override
	public AccountResponseDto getByAccountNumber(String accountNumber) {
		Account account = accountRepo.findByAccountNumber(accountNumber).orElseThrow(
				() -> new BankAccountNotFoundException("Bank with account Number: " + accountNumber + " not found"));

		return AccountMapper.toResponse(account);
	}

	@PreAuthorize("hasRole('MANAGER')")
	@Override
	public AccountResponseDto createAccount(AccountRequestDto accountRequestDto) {
		Account account = AccountMapper.toRequest(accountRequestDto);
		account.setAccountNumber(AccountNumberGenerator.generate());
		Account savedAccount = accountRepo.save(account);
		return AccountMapper.toResponse(savedAccount);
	}

	@PreAuthorize("hasRole('MANAGER')")
	@Override
	public void deleteAccount(String accountNumber) {
		Account account = accountRepo.findByAccountNumber(accountNumber)
				.orElseThrow(() -> new BankAccountNotFoundException(accountNumber + " not Found"));

		accountRepo.delete(account);
	}

	@PreAuthorize("hasRole('MANAGER')")
	@Override
	public AccountResponseDto updateAccount(String accountNumber, AccountRequestDto updateAccount) {
		Account account = accountRepo.findByAccountNumber(accountNumber).orElseThrow(
				() -> new BankAccountNotFoundException("Bank with accountNumber: " + accountNumber + " not found"));
		account.setName(updateAccount.getName());
		account.setBalance(updateAccount.getInitialBalance());
		Account updatedAccount = accountRepo.save(account);
		return AccountMapper.toResponse(updatedAccount);
	}

}
