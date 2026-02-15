import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AccountService } from '../services/account.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
  <div class="card" style="background:#000;border:1px solid #666;color:#fff;max-width:700px;">
    <div class="card-body">
      <h4>Create New Account</h4>
      <div class="alert mt-3" *ngIf="message" [style.background]="success?'#111':'#220'" style="color:#fff;border:1px solid #555;">{{message}}</div>
      <form [formGroup]="form" (ngSubmit)="submit()" class="mt-3">
        <div class="mb-3"><label>Name</label><input class="form-control" style="background:#000;color:#fff;border:1px solid #666;" formControlName="name"></div>
        <div class="mb-3"><label>Initial Balance</label><input type="number" class="form-control" style="background:#000;color:#fff;border:1px solid #666;" formControlName="initialBalance"></div>
        <button class="btn" style="background:#fff;color:#000;" [disabled]="form.invalid||loading">{{loading?'Creating...':'Create Account'}}</button>
      </form>
    </div>
  </div>
  `
})
export class AccountCreationComponent {
  loading = false;
  success = false;
  message = '';
  form = this.fb.group({ name: ['', Validators.required], initialBalance: [0, [Validators.required, Validators.min(0)]] });
  constructor(private readonly fb: FormBuilder, private readonly accountService: AccountService) {}

  submit(): void {
    if (this.form.invalid) { return; }
    this.loading = true;
    this.message = '';
    const v = this.form.getRawValue();
    this.accountService.createAccount({ name: v.name ?? '', initialBalance: Number(v.initialBalance ?? 0) }).subscribe({
      next: (res) => {
        this.loading = false;
        this.success = true;
        this.message = `Account created successfully. Account Number: ${res.accountNumber}`;
        this.form.reset({ name: '', initialBalance: 0 });
      },
      error: (err) => {
        this.loading = false;
        this.success = false;
        this.message = err?.error?.detail ?? 'Unable to create account.';
      }
    });
  }
}
