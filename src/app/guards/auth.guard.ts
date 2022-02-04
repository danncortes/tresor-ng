import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot): Observable<UrlTree | boolean> | boolean {

    if (route.routeConfig) {
      const path = route.routeConfig.path;

      if (path === 'login') {
        if (this.userService.isLoggedIn()) {
          void this.router.navigateByUrl('');
        }
        return true;
      } else if (!this.userService.isLoggedIn()) {
        void this.router.navigateByUrl('/login');
        return false;
      } else {
        return this.userService.canContinue(path as string);
      }
    }

    return false;
  }
}
