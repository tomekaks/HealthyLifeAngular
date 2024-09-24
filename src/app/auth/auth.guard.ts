import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountsService } from './accounts.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountsService = inject(AccountsService);
  const router = inject(Router);

  if (accountsService.currentUser()) {
    return true;
  } else {
    router.navigateByUrl('');
    return false;
  }
};
