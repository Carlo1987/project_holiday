import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from 'src/app/services/user_service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(UserService);
  return authService.identity(false);
};
