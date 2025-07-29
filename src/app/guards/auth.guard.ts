import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = async () => {
  const storage = inject(StorageService);
  const router = inject(Router);

  const logged = await storage.get('logged_in');
  if (logged) {
    return true;
  }

  router.navigateByUrl('/login', { replaceUrl: true });
  return false;
};
