import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.checkAuth()) {
    router.navigateByUrl('/sign-in');
    return false;
  }
  return true;
};
