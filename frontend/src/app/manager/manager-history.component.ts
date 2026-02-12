import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/types';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  template: `
  <div class="card" style="background:#000;border:1px solid #666;color:#fff;">
    <div class="card-body">
      <h4>Full Transaction History</h4>
      <form class="row g-2 mb-3" [formGroup]="form" (ngSubmit)="load()">
        <div class="col-md-6"><input class="form-control" style="background:#000;color:#fff;border:1px solid #666;" formControlName="accountNumber" placeholder="Enter account number"></div>
        <div class="col-md-2"><button class="btn" style="border:1px solid #777;color:#fff;" [disabled]="form.invalid">Fetch</button></div>
      </form>
      <table class="table table-dark table-bordered" style="--bs-table-bg:#000; --bs-table-color:#fff; border-color:#555;" *ngIf="pageData.length>0">
        <thead><tr><th>Type</th><th>Amount</th><th>Status</th><th>Created</th></tr></thead>
        <tbody><tr *ngFor="let t of pageData"><td>{{t.transactionType}}</td><td>{{t.amount}}</td><td>{{t.status}}</td><td>{{t.createdAt | date:'short'}}</td></tr></tbody>
      </table>
      <p *ngIf="loaded && transactions.length===0">No transactions found.</p>
      <div class="d-flex gap-2" *ngIf="transactions.length>pageSize"><button class="btn btn-sm" style="border:1px solid #777;color:#fff;" (click)="prev()" [disabled]="page===1">Prev</button><button class="btn btn-sm" style="border:1px solid #777;color:#fff;" (click)="next()" [disabled]="page*pageSize>=transactions.length">Next</button></div>
    </div>
  </div>
  `
})
export class ManagerHistoryComponent {
  form = this.fb.group({ accountNumber: ['', Validators.required] });
  transactions: Transaction[] = [];
  pageData: Transaction[] = [];
  page = 1;
  pageSize = 10;
  loaded = false;
  constructor(private readonly fb: FormBuilder, private readonly txService: TransactionService) {}

  load(): void {
    const accountNumber = this.form.getRawValue().accountNumber ?? '';
    this.txService.getHistory(accountNumber).subscribe((res) => {
      this.loaded = true;
      this.transactions = res;
      this.page = 1;
      this.slice();
    });
  }
  next(): void { this.page++; this.slice(); }
  prev(): void { this.page--; this.slice(); }
  private slice(): void { const s=(this.page-1)*this.pageSize; this.pageData = this.transactions.slice(s,s+this.pageSize); }
}
