import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  template: ''
})
export class HomeRedirectComponent implements OnInit {
  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  ngOnInit(): void {
    const role = this.auth.getRole();
    this.router.navigate([role === 'MANAGER' ? '/manager/dashboard' : '/clerk/dashboard']);
  }
}
