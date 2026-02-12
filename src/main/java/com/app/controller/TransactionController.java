package com.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.DepositDto;
import com.app.dto.TransactionResponseDto;
import com.app.dto.WithdrawDto;
import com.app.service.TransactionService;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
 private TransactionService transactionService;
 
 public TransactionController(TransactionService transactionService) {
	 this.transactionService=transactionService;
 }
 
 @PostMapping("/deposit")
 public ResponseEntity<TransactionResponseDto> deposit(
         @RequestBody DepositDto depositDto) {

     TransactionResponseDto response =
             transactionService.deposit(depositDto);

     return ResponseEntity
             .status(HttpStatus.CREATED)
             .body(response);
 }
 
 @PostMapping("/withdraw")
 public ResponseEntity<TransactionResponseDto> withdraw(
         @RequestBody WithdrawDto withdrawDto) {

     TransactionResponseDto response =
             transactionService.withdraw(withdrawDto);

     return ResponseEntity
             .status(HttpStatus.CREATED)
             .body(response);
 }
 
 @GetMapping("/history/{accountNumber}")
 public ResponseEntity<List<TransactionResponseDto>> history(
         @PathVariable String accountNumber) {

     return ResponseEntity.ok(
             transactionService.getTransactionHistory(accountNumber)
     );
 }
 
 
}
