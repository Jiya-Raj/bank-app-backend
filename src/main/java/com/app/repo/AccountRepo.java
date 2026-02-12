package com.app.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Account;

public interface AccountRepo extends JpaRepository<Account,Long> {
	Optional<Account> findByAccountNumber(String accountNumber);

}
