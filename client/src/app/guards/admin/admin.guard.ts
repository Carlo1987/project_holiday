import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from 'src/app/services/user_service';

export const adminGuard: CanActivateFn = (route, state) => {
    let adminService = inject(UserService);
    return adminService.admin();
};
