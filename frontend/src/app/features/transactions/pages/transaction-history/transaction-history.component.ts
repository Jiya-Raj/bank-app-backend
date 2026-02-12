import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { TransactionResponse } from '../../../../core/models/transaction.models';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';
import { TransactionService } from '../../services/transaction.service';

@Component({ selector: 'app-transaction-history', templateUrl: './transaction-history.component.html' })
export class TransactionHistoryComponent {
  private readonly fb = inject(FormBuilder);

  loading = false;
  errorMessage = '';
  transactions: TransactionResponse[] = [];

  readonly form = this.fb.nonNullable.group({ accountNumber: ['', [Validators.required]] });

  constructor(private readonly tx: TransactionService, private readonly errors: ErrorHandlerService) {}

  search(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.transactions = [];
    const accountNumber = this.form.getRawValue().accountNumber;
    this.tx
      .history(accountNumber)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (rows) => (this.transactions = rows),
        error: (error: unknown) => (this.errorMessage = this.errors.toUserMessage(error))
      });
  }
}
