package com.app.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.app.enums.TransactionStatus;
import com.app.enums.TransactionType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "transactions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false, updatable = false)
    private Account account;

	@Enumerated(EnumType.STRING)
	private TransactionType type;

	@Enumerated(EnumType.STRING)
	private TransactionStatus status;

	@Column(nullable = false)
	private BigDecimal amount;

	@Column(nullable = false)
	private LocalDateTime createdAt;

	@Column(nullable = false)
	private String performedBy;
	private String approvedBy;
}
