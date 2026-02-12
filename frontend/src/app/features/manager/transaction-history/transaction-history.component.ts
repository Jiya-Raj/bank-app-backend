import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Transaction } from '../../../core/models/transaction.model';
import { ApiErrorService } from '../../../core/services/api-error.service';
import { TransactionService } from '../../../core/services/transaction.service';

@Component({
  selector: 'app-manager-transaction-history',
  templateUrl: './transaction-history.component.html'
})
export class ManagerTransactionHistoryComponent {
  accountNumber = '';
  loading = false;
  errorMessage = '';
  rows: Transaction[] = [];

  constructor(
    private readonly transactionService: TransactionService,
    private readonly apiErrorService: ApiErrorService
  ) {}

  load(): void {
    if (!this.accountNumber.trim()) {
      this.errorMessage = 'Account number is required.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.transactionService.getHistory(this.accountNumber).subscribe({
      next: (rows) => {
        this.rows = rows;
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
