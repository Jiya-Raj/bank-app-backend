import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-logout',
  template: '<p>Signing out...</p>'
})
export class LogoutComponent implements OnInit {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
