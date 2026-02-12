import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { ApiErrorService } from '../../../core/services/api-error.service';
import { TransactionService } from '../../../core/services/transaction.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html'
})
export class WithdrawComponent {
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

    this.transactionService.withdraw(this.form.getRawValue()).subscribe({
      next: (transaction) => {
        this.successMessage = transaction.status === 'PENDING_APPROVAL'
          ? 'Withdrawal submitted for manager approval.'
          : 'Withdrawal processed successfully.';
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
