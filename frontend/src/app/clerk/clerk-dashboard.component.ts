import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Account } from '../models/types';

@Component({
  standalone: true,
  imports: [RouterLink, NgFor, CurrencyPipe],
  template: `
  <div class="mb-3 d-flex gap-2 flex-wrap">
    <a routerLink="/clerk/deposit" class="btn" style="border:1px solid #777;color:#fff;">Deposit</a>
    <a routerLink="/clerk/withdraw" class="btn" style="border:1px solid #777;color:#fff;">Withdraw</a>
    <a routerLink="/clerk/history" class="btn" style="border:1px solid #777;color:#fff;">Transaction History</a>
  </div>
  <div class="card" style="background:#000;border:1px solid #666;color:#fff;">
    <div class="card-body">
      <h4>Clerk Dashboard</h4>
      <p style="color:#ccc;">Withdrawals up to ₹2,00,000 are processed immediately. Above that threshold, transaction status becomes PENDING_APPROVAL.</p>
      <table class="table table-dark table-bordered" style="--bs-table-bg:#000; --bs-table-color:#fff; border-color:#555;">
        <thead><tr><th>Account</th><th>Name</th><th>Balance</th></tr></thead>
        <tbody><tr *ngFor="let acc of accounts"><td>{{acc.accountNumber}}</td><td>{{acc.name}}</td><td>{{acc.balance | currency:'INR':'symbol':'1.0-0'}}</td></tr></tbody>
      </table>
    </div>
  </div>
  `
})
export class ClerkDashboardComponent implements OnInit {
  accounts: Account[] = [];
  constructor(private readonly accountService: AccountService) {}
  ngOnInit(): void { this.accountService.getAllAccounts().subscribe((res)=>this.accounts=res); }
}
