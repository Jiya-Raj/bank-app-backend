import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AccountResponse } from '../../../../core/models/account.models';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html'
})
export class AccountListComponent implements OnInit {
  loading = false;
  errorMessage = '';
  accounts: AccountResponse[] = [];

  constructor(private readonly accountService: AccountService, private readonly errors: ErrorHandlerService) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.loading = true;
    this.errorMessage = '';
    this.accountService
      .getAccounts()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => (this.accounts = data),
        error: (error: unknown) => (this.errorMessage = this.errors.toUserMessage(error))
      });
  }
}
