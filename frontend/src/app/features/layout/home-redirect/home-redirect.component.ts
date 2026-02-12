import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-home-redirect',
  template: ''
})
export class HomeRedirectComponent implements OnInit {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  ngOnInit(): void {
    this.router.navigate([this.authService.getRole() === 'MANAGER' ? '/manager' : '/clerk']);
  }
}
