import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../core/services/auth';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUserValue;

  if (!user?.token) {
    router.navigate(['/auth/login']);
    return false;
  }

  // Decode JWT payload to check roles
  try {
    const payload = JSON.parse(atob(user.token.split('.')[1]));
    const roles: string[] = payload.roles || [];
    if (roles.includes('ROLE_ADMIN') || roles.includes('ADMIN')) {
      return true;
    }
  } catch {
    // Invalid token
  }

  router.navigate(['/dashboard']);
  return false;
};
