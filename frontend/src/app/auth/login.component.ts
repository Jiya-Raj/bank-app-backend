import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="container d-flex align-items-center justify-content-center" style="min-height:100vh;">
      <div class="card p-4" style="width:100%; max-width:420px; background:#000; border:1px solid #666; color:#fff;">
        <h3 class="mb-4 text-center">Bank Login</h3>
        <div class="alert" style="background:#1a1a1a; color:#fff; border:1px solid #555;" *ngIf="errorMessage">{{ errorMessage }}</div>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input class="form-control" style="background:#000; color:#fff; border:1px solid #666;" formControlName="username"/>
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" style="background:#000; color:#fff; border:1px solid #666;" formControlName="password"/>
          </div>
          <button [disabled]="form.invalid || loading" class="btn w-100" style="background:#fff; color:#000;">
            {{ loading ? 'Signing in...' : 'Login' }}
          </button>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  loading = false;
  errorMessage = '';
  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private readonly fb: FormBuilder, private readonly auth: AuthService, private readonly router: Router) {}

  submit(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Please enter username and password.';
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    const value = this.form.getRawValue();

    this.auth.login({ username: value.username ?? '', password: value.password ?? '' }).subscribe({
      next: () => {
        this.loading = false;
        const role = this.auth.getRole();
        this.router.navigate([role === 'MANAGER' ? '/manager/dashboard' : '/clerk/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.detail ?? 'Login failed.';
      }
    });
  }
}
