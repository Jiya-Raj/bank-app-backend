import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Account } from '../../../core/models/account.model';
import { AccountService } from '../../../core/services/account.service';
import { ApiErrorService } from '../../../core/services/api-error.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html'
})
export class AccountListComponent implements OnInit {
  loading = false;
  errorMessage = '';
  accounts: Account[] = [];

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    initialBalance: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly accountService: AccountService,
    private readonly apiErrorService: ApiErrorService
  ) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.loading = true;
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.apiErrorService.toApiError(error).detail;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  createAccount(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.accountService.createAccount(this.form.getRawValue()).subscribe({
      next: () => {
        this.form.reset({ name: '', initialBalance: 0 });
        this.fetchAccounts();
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
