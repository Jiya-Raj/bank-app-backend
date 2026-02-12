import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  template: `
  <div style="min-height:100vh; background-color:#000; color:#fff;">
    <nav style="border-bottom:1px solid #555;" class="navbar navbar-expand-lg px-3 py-2">
      <span class="navbar-brand" style="color:#fff; font-weight:600;">In-House Bank</span>
      <div class="ms-auto d-flex align-items-center gap-3" *ngIf="auth.isAuthenticated()">
        <span style="color:#fff;">{{ auth.getUsername() }} ({{ auth.getRole() }})</span>
        <button class="btn btn-sm" style="border:1px solid #777; color:#fff;" (click)="logout()">Logout</button>
      </div>
    </nav>
    <main class="container-fluid py-4 px-4">
      <router-outlet></router-outlet>
    </main>
  </div>
  `
})
export class LayoutComponent {
  constructor(public readonly auth: AuthService, private readonly router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
