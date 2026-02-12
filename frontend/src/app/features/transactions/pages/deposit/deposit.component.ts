import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';
import { TransactionService } from '../../services/transaction.service';

@Component({ selector: 'app-deposit', templateUrl: './deposit.component.html' })
export class DepositComponent {
  private readonly fb = inject(FormBuilder);

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  readonly form = this.fb.nonNullable.group({
    accountNumber: ['', [Validators.required]],
    amount: [0, [Validators.required, Validators.min(0.01)]]
  });

  constructor(private readonly tx: TransactionService, private readonly errors: ErrorHandlerService) {}

  submit(): void {
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }
    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;
    this.tx
      .deposit(this.form.getRawValue())
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (res) => {
          this.successMessage = `Deposit success. Status: ${res.status}`;
          this.form.reset({ accountNumber: '', amount: 0 });
        },
        error: (error: unknown) => (this.errorMessage = this.errors.toUserMessage(error))
      });
  }
}
