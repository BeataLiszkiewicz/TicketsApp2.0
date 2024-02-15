import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export const userAuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
  return true;
};


