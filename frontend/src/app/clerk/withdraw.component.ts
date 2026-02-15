import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TransactionService } from '../services/transaction.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
  <div class="card" style="background:#000;border:1px solid #666;color:#fff;max-width:700px;">
    <div class="card-body">
      <h4>Withdrawal</h4>
      <p style="color:#ccc;">High-value withdrawal requests above ₹2,00,000 are recorded as pending approval.</p>
      <div class="alert" *ngIf="message" [style.background]="success?'#111':'#220'" style="color:#fff;border:1px solid #555;">{{message}}</div>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="mb-3"><label>Account Number</label><input class="form-control" style="background:#000;color:#fff;border:1px solid #666;" formControlName="accountNumber"></div>
        <div class="mb-3"><label>Amount</label><input type="number" class="form-control" style="background:#000;color:#fff;border:1px solid #666;" formControlName="amount"></div>
        <button class="btn" style="background:#fff;color:#000;" [disabled]="form.invalid || loading">{{loading?'Processing...':'Withdraw'}}</button>
      </form>
    </div>
  </div>`
})
export class WithdrawComponent {
  loading = false; success = false; message='';
  form = this.fb.group({ accountNumber: ['', Validators.required], amount:[0,[Validators.required, Validators.min(1)]] });
  constructor(private readonly fb: FormBuilder, private readonly txService: TransactionService) {}
  submit(): void {
    if (this.form.invalid) { return; }
    const v = this.form.getRawValue(); this.loading=true;
    this.txService.withdraw(v.accountNumber ?? '', Number(v.amount ?? 0)).subscribe({
      next: (res)=>{ this.loading=false; this.success=true; this.message=res.status === 'PENDING_APPROVAL' ? 'Withdrawal request submitted for manager approval.' : 'Withdrawal successful.'; },
      error: (e)=>{ this.loading=false; this.success=false; this.message=e?.error?.detail ?? 'Withdrawal failed.'; }
    });
  }
}
