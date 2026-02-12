import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { TransactionResponse } from '../../../../core/models/transaction.models';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';
import { TransactionService } from '../../services/transaction.service';

@Component({ selector: 'app-pending-approvals', templateUrl: './pending-approvals.component.html' })
export class PendingApprovalsComponent implements OnInit {
  loading = false;
  actionInProgress = false;
  errorMessage = '';
  rows: TransactionResponse[] = [];

  constructor(private readonly tx: TransactionService, private readonly errors: ErrorHandlerService) {}

  ngOnInit(): void {
    this.loadPending();
  }

  loadPending(): void {
    this.loading = true;
    this.errorMessage = '';
    this.tx.getPendingApprovals().pipe(finalize(() => (this.loading = false))).subscribe({
      next: (rows) => (this.rows = rows),
      error: (error: unknown) => {
        this.errorMessage = this.errors.toUserMessage(error);
      }
    });
  }

  approve(row: TransactionResponse): void {
    if (this.actionInProgress || row.id === undefined) {
      return;
    }
    this.actionInProgress = true;
    this.tx.approve(row.id).pipe(finalize(() => (this.actionInProgress = false))).subscribe({
      next: () => this.loadPending(),
      error: (error: unknown) => (this.errorMessage = this.errors.toUserMessage(error))
    });
  }

  reject(row: TransactionResponse): void {
    if (this.actionInProgress || row.id === undefined) {
      return;
    }
    this.actionInProgress = true;
    this.tx.reject(row.id).pipe(finalize(() => (this.actionInProgress = false))).subscribe({
      next: () => this.loadPending(),
      error: (error: unknown) => (this.errorMessage = this.errors.toUserMessage(error))
    });
  }
}
