import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserRole } from '../models/auth.models';
import { AuthService } from '../../features/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles = (route.data['roles'] as UserRole[] | undefined) ?? [];
    if (roles.length === 0 || this.auth.hasRole(roles)) {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}
