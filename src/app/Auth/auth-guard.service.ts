import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) { }
  canActivate(): boolean {
    console.log("gaurd service")
    if (!this.auth.getToken()) {
      this.router.navigateByUrl('/signin');
      return false;
    }
    return true;
  }
}
