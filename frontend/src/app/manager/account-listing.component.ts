import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { AccountService } from '../services/account.service';
import { Account } from '../models/types';

@Component({
  standalone: true,
  imports: [NgFor, CurrencyPipe],
  template: `
  <div class="card" style="background:#000;border:1px solid #666;color:#fff;">
    <div class="card-body"><h4>Account Listing</h4>
    <table class="table table-dark table-bordered" style="--bs-table-bg:#000; --bs-table-color:#fff; border-color:#555;">
      <thead><tr><th>Account Number</th><th>Name</th><th>Balance</th></tr></thead>
      <tbody><tr *ngFor="let acc of accounts"><td>{{acc.accountNumber}}</td><td>{{acc.name}}</td><td>{{acc.balance | currency:'INR':'symbol':'1.0-0'}}</td></tr></tbody>
    </table></div>
  </div>`
})
export class AccountListingComponent implements OnInit {
  accounts: Account[] = [];
  constructor(private readonly accountService: AccountService) {}
  ngOnInit(): void { this.accountService.getAllAccounts().subscribe((res) => this.accounts = res); }
}
