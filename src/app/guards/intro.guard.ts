import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const introGuard: CanActivateFn = async () => {
  const storage = inject(StorageService);
  const router = inject(Router);

  const seen = await storage.get('intro_visto');
  if (!seen) {
    return true; // puede ver la intro
  }

  router.navigateByUrl('/login', { replaceUrl: true });
  return false;
};
