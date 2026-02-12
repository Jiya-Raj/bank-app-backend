import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { ApiErrorService } from '../../../core/services/api-error.service';
import { TransactionService } from '../../../core/services/transaction.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html'
})
export class DepositComponent {
  loading = false;
  successMessage = '';
  errorMessage = '';

  readonly form = this.fb.nonNullable.group({
    accountNumber: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(1)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly transactionService: TransactionService,
    private readonly apiErrorService: ApiErrorService
  ) {}

  submit(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.transactionService.deposit(this.form.getRawValue()).subscribe({
      next: () => {
        this.successMessage = 'Deposit processed successfully.';
        this.form.controls.amount.setValue(0);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.apiErrorService.toApiError(error).detail;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
