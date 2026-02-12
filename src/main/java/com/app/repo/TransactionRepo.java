package com.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Transaction;

public interface TransactionRepo extends JpaRepository<Transaction,Long>{
	@Query("""
		    select t
		    from Transaction t
		    join fetch t.account
		    where t.account.accountNumber = :accountNumber
		""")
	List<Transaction> findByAccount_AccountNumber(String accountNumber);
}
