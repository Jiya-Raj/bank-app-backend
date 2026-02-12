package com.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AccountRequestDto;
import com.app.dto.AccountResponseDto;
import com.app.service.AccountService;

@RestController
@RequestMapping("/accounts")
public class AccountController {
	private AccountService accountService;

	public AccountController(AccountService accountService) {
		this.accountService = accountService;
	}

	@GetMapping
	public ResponseEntity<List<AccountResponseDto>> getAll() {
		return ResponseEntity.status(HttpStatus.OK).body(accountService.getAll());
	}

	@GetMapping(path = "{accountNumber}")
	public ResponseEntity<AccountResponseDto> getById(@PathVariable String accountNumber) {
		return ResponseEntity.status(HttpStatus.OK).body(accountService.getByAccountNumber(accountNumber));
	}

	@PostMapping
	public ResponseEntity<AccountResponseDto> create(@RequestBody AccountRequestDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(accountService.createAccount(dto));
	}

	@DeleteMapping(path = "/{accountNumber}")
	public ResponseEntity<Void> delete(@PathVariable String accountNumber) {
		accountService.deleteAccount(accountNumber);
		return ResponseEntity.noContent().build();
	}

	@PutMapping(path = "/{accountNumber}")
	public ResponseEntity<AccountResponseDto> update(@PathVariable String accountNumber,
			@RequestBody AccountRequestDto dto) {
		return ResponseEntity.ok(accountService.updateAccount(accountNumber, dto));
	}

}
