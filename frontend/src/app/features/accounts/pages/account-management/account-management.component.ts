import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html'
})
export class AccountManagementComponent {
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    initialBalance: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly accountService: AccountService,
    private readonly errors: ErrorHandlerService
  ) {}

  submit(): void {
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }
    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    this.accountService
      .createAccount(this.form.getRawValue())
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (account) => {
          this.successMessage = `Account ${account.accountNumber} created successfully.`;
          this.form.reset({ name: '', initialBalance: 0 });
        },
        error: (error: unknown) => (this.errorMessage = this.errors.toUserMessage(error))
      });
  }
}
