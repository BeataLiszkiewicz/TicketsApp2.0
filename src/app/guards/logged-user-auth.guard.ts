import { CanActivateFn } from '@angular/router';

export const loggedUserAuthGuard: CanActivateFn = (route, state) => {
  return true;
};
