import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../core/services/auth.service';
import { ApiErrorService } from '../../../core/services/api-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  submitting = false;
  errorMessage = '';

  readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    rememberMe: [true]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly apiErrorService: ApiErrorService,
    private readonly router: Router
  ) {}

  submit(): void {
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.submitting = true;

    this.authService.login(this.form.getRawValue(), this.form.controls.rememberMe.value).subscribe({
      next: () => {
        const role = this.authService.getRole();
        this.router.navigate([role === 'MANAGER' ? '/manager' : '/clerk']);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.apiErrorService.toApiError(error).detail;
        this.submitting = false;
      },
      complete: () => {
        this.submitting = false;
      }
    });
  }
}
