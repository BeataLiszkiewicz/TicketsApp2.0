import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loggedUserAuthGuard } from './logged-user-auth.guard';

describe('loggedUserAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loggedUserAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
