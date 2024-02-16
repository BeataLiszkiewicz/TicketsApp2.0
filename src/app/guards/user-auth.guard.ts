import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const userAuthGuard: CanActivateFn = () => {
  const authService=inject(AuthenticationService)
  const router=inject(Router)

    if (authService.isAuthenticated()){
      return true;
    }else{
      router.navigate(['/home'])
      return false;
    }
  
};
