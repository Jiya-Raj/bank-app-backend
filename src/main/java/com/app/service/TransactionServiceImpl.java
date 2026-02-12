package com.app.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.app.dto.DepositDto;
import com.app.dto.TransactionResponseDto;
import com.app.dto.WithdrawDto;
import com.app.entities.Account;
import com.app.entities.Transaction;
import com.app.enums.TransactionStatus;
import com.app.enums.TransactionType;
import com.app.exception.BankAccountNotFoundException;
import com.app.exception.InsufficientBalanceException;
import com.app.exception.InvalidAmountException;
import com.app.exception.InvalidTransactionException;
import com.app.exception.TransactionNotFoundException;
import com.app.repo.AccountRepo;
import com.app.repo.TransactionRepo;
import com.app.util.SecurityUtil;
import com.app.util.mapper.TransactionMapper;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {

	private static final BigDecimal APPROVAL_LIMIT = new BigDecimal("200000");

	private final AccountRepo accountRepo;
	private final TransactionRepo transactionRepo;

	public TransactionServiceImpl(AccountRepo accountRepo, TransactionRepo transactionRepo) {
		this.accountRepo = accountRepo;
		this.transactionRepo = transactionRepo;
	}

	@PreAuthorize("hasRole('CLERK')")
	@Override
	public TransactionResponseDto withdraw(WithdrawDto withdrawDto) {
		String clerkUsername = SecurityUtil.getCurrentUsername();

		if (withdrawDto.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
			throw new InvalidAmountException("Withdraw amount must be greater than zero");
		}

		Account account = accountRepo.findByAccountNumber(withdrawDto.getAccountNumber())
				.orElseThrow(() -> new BankAccountNotFoundException(withdrawDto.getAccountNumber()));

		if (account.getBalance().compareTo(withdrawDto.getAmount()) < 0) {
			throw new InsufficientBalanceException("Insufficient balance");
		}

		Transaction transaction = new Transaction();
		transaction.setAccount(account);
		transaction.setType(TransactionType.WITHDRAWAL);
		transaction.setAmount(withdrawDto.getAmount());
		transaction.setCreatedAt(LocalDateTime.now());
		transaction.setPerformedBy(clerkUsername);
		if (withdrawDto.getAmount().compareTo(APPROVAL_LIMIT) <= 0) {

			account.setBalance(account.getBalance().subtract(withdrawDto.getAmount()));

			transaction.setStatus(TransactionStatus.SUCCESS);
			accountRepo.save(account);

		} else {
			transaction.setStatus(TransactionStatus.PENDING_APPROVAL);
		}

		transactionRepo.save(transaction);
		return TransactionMapper.toResponse(transaction);
	}

	@PreAuthorize("hasRole('CLERK')")
	@Override
	public TransactionResponseDto deposit(DepositDto depositDto) {

		String clerkUsername = SecurityUtil.getCurrentUsername();
		if (depositDto.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
			throw new InvalidAmountException("Deposit amount must be greater than zero");
		}

		Account account = accountRepo.findByAccountNumber(depositDto.getAccountNumber())
				.orElseThrow(() -> new BankAccountNotFoundException(depositDto.getAccountNumber()));

		account.setBalance(account.getBalance().add(depositDto.getAmount()));

		Transaction transaction = new Transaction();
		transaction.setAccount(account);
		transaction.setType(TransactionType.DEPOSIT);
		transaction.setAmount(depositDto.getAmount());
		transaction.setStatus(TransactionStatus.SUCCESS);
		transaction.setCreatedAt(LocalDateTime.now());
		transaction.setPerformedBy(clerkUsername);
		accountRepo.save(account);
		transactionRepo.save(transaction);

		return TransactionMapper.toResponse(transaction);
	}

	@PreAuthorize("hasAnyRole('CLERK', 'MANAGER')")
	@Override
	public List<TransactionResponseDto> getTransactionHistory(String accountNumber) {
		return transactionRepo.findByAccount_AccountNumber(accountNumber).stream().map(TransactionMapper::toResponse)
				.toList();
	}

	@PreAuthorize("hasRole('MANAGER')")
	@Override
	public TransactionResponseDto approveTransaction(Long transactionId) {

		String managerUsername = SecurityUtil.getCurrentUsername();

		Transaction transaction = transactionRepo.findById(transactionId)
				.orElseThrow(() -> new TransactionNotFoundException("Transaction not found"));
		if (transaction.getStatus() != TransactionStatus.PENDING_APPROVAL) {
			throw new InvalidTransactionException("Transaction is not pending approval");
		}

		Account account = transaction.getAccount();

		account.setBalance(account.getBalance().subtract(transaction.getAmount()));

		transaction.setStatus(TransactionStatus.APPROVED);
		transaction.setApprovedBy(managerUsername);

		accountRepo.save(account);
		transactionRepo.save(transaction);

		return TransactionMapper.toResponse(transaction);
	}

}
