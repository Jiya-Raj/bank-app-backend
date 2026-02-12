import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountService } from '../services/account.service';
import { TransactionService } from '../services/transaction.service';
import { Account, Transaction } from '../models/types';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, CurrencyPipe],
  template: `
  <div class="row g-3">
    <div class="col-12">
      <div class="d-flex gap-2 flex-wrap mb-3">
        <a routerLink="/manager/accounts/create" class="btn" style="border:1px solid #777; color:#fff;">Create Account</a>
        <a routerLink="/manager/accounts/list" class="btn" style="border:1px solid #777; color:#fff;">Account Listing</a>
        <a routerLink="/manager/clerks" class="btn" style="border:1px solid #777; color:#fff;">Clerk Management</a>
        <a routerLink="/manager/approvals" class="btn" style="border:1px solid #777; color:#fff;">Withdrawal Approvals</a>
        <a routerLink="/manager/history" class="btn" style="border:1px solid #777; color:#fff;">Transaction History</a>
      </div>
    </div>
    <div class="col-md-4"><div class="card p-3" style="background:#000;border:1px solid #666;color:#fff;"><h5>Total Accounts</h5><h2>{{ accounts.length }}</h2></div></div>
    <div class="col-md-4"><div class="card p-3" style="background:#000;border:1px solid #666;color:#fff;"><h5>Total Funds</h5><h2>{{ totalBalance | currency:'INR':'symbol':'1.0-0' }}</h2></div></div>
    <div class="col-md-4"><div class="card p-3" style="background:#000;border:1px solid #666;color:#fff;"><h5>Pending Approvals</h5><h2>{{ pendingApprovals.length }}</h2></div></div>
    <div class="col-12">
      <div class="card" style="background:#000;border:1px solid #666;color:#fff;"><div class="card-body">
      <h5>Pending High-Value Withdrawals</h5>
      <div *ngIf="loading">Loading...</div>
      <table *ngIf="!loading" class="table table-dark table-bordered" style="--bs-table-bg:#000; --bs-table-color:#fff; border-color:#555;">
      <thead><tr><th>Account</th><th>Amount</th><th>Status</th><th>Created</th></tr></thead>
      <tbody><tr *ngFor="let t of pendingApprovals"><td>{{t.accountNumber}}</td><td>{{t.amount | currency:'INR':'symbol':'1.0-0'}}</td><td>{{t.status}}</td><td>{{t.createdAt | date:'short'}}</td></tr>
      <tr *ngIf="pendingApprovals.length===0"><td colspan="4" class="text-center">No pending approvals.</td></tr></tbody>
      </table>
      </div></div>
    </div>
  </div>
  `
})
export class ManagerDashboardComponent implements OnInit {
  accounts: Account[] = [];
  pendingApprovals: Transaction[] = [];
  totalBalance = 0;
  loading = false;

  constructor(private readonly accountService: AccountService, private readonly txService: TransactionService) {}

  ngOnInit(): void { this.load(); }

  private load(): void {
    this.loading = true;
    this.accountService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.totalBalance = accounts.reduce((sum, acc) => sum + Number(acc.balance), 0);
        if (accounts.length === 0) { this.loading = false; return; }
        let processed = 0;
        const pending: Transaction[] = [];
        accounts.forEach((account) => {
          this.txService.getHistory(account.accountNumber).subscribe({
            next: (txs) => {
              pending.push(...txs.filter((t) => t.status === 'PENDING_APPROVAL' && t.transactionType === 'WITHDRAWAL'));
              processed++;
              if (processed === accounts.length) {
                this.pendingApprovals = pending.sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()).slice(0, 10);
                this.loading = false;
              }
            },
            error: () => { processed++; if (processed === accounts.length) { this.pendingApprovals = pending; this.loading = false; } }
          });
        });
      },
      error: () => { this.loading = false; }
    });
  }
}
