import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, observable, Observable, Subject } from 'rxjs';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router, private tokenService: TokenService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (route.routeConfig) {
      const path = route.routeConfig.path;

      if (path === 'login') {
        if (this.userService.isLoggedIn()) {
          void this.router.navigateByUrl('');
        }
        return true;
      } else if(!this.userService.isLoggedIn()) {
        void this.router.navigateByUrl('/login');
        return false;
      } else {
        return this.userService.canContinue(path as string);
      }
    }

    return false;
  }
}
