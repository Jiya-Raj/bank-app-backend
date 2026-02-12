import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { AccountService } from '../services/account.service';
import { TransactionService } from '../services/transaction.service';
import { Account, Transaction } from '../models/types';

@Component({
  standalone: true,
  imports: [NgFor],
  template: `
  <div class="card" style="background:#000;border:1px solid #666;color:#fff;">
    <div class="card-body">
      <h4>Withdrawal Approval Queue</h4>
      <p style="color:#ccc;">Pending withdrawals are listed from immutable transaction history.</p>
      <table class="table table-dark table-bordered" style="--bs-table-bg:#000; --bs-table-color:#fff; border-color:#555;">
        <thead><tr><th>Account</th><th>Amount</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
        <tbody>
          <tr *ngFor="let item of pendingTransactions">
            <td>{{item.accountNumber}}</td><td>{{item.amount}}</td><td>{{item.status}}</td><td>{{item.createdAt | date:'short'}}</td>
            <td><button disabled class="btn btn-sm" style="border:1px solid #777; color:#aaa;">Approve/Reject API unavailable</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `
})
export class ApprovalComponent implements OnInit {
  pendingTransactions: Transaction[] = [];
  constructor(private readonly accountService: AccountService, private readonly txService: TransactionService) {}
  ngOnInit(): void {
    this.accountService.getAllAccounts().subscribe((accounts: Account[]) => {
      accounts.forEach((account) => {
        this.txService.getHistory(account.accountNumber).subscribe((txs) => {
          this.pendingTransactions = [
            ...this.pendingTransactions,
            ...txs.filter((t) => t.status === 'PENDING_APPROVAL' && t.transactionType === 'WITHDRAWAL')
          ];
        });
      });
    });
  }
}
