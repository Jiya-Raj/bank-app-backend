import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/types';

export const roleGuard = (allowedRoles: Role[]): CanActivateFn => () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const role = auth.getRole();

  if (!auth.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  if (!role || !allowedRoles.includes(role)) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
