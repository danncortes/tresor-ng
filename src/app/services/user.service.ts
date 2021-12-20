import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthCredentials, User } from '../models/user.model';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import {ChipLog} from "../components/chips/chips.component";

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;

  constructor(private http: HttpClient, public tokenService: TokenService, public router: Router) {
  }

  public isLoggedIn(): boolean {
    return !!this.tokenService.getToken();
  }

  public login(authCredentials: AuthCredentials): Observable<any> {
    const $req = new Subject();
    this.http.post(`${apiUrl}/user/login`, authCredentials).subscribe((response: any) => {
      const { token } = response as { token: string };
      this.tokenService.saveToken(token);
      window.sessionStorage.setItem('masterp', authCredentials.masterPassword);

      $req.next();
    },
    (err) => {
      $req.error(err);
    });
    return $req;
  }

  public fetchUser(): Observable<any> {
    const $req = new Subject();

    this.http.get(`${apiUrl}/user`).subscribe((response: any) => {
      const { _id, name, email, verified } = response as User;
      this.user = {
        _id, name, email, verified
      };
      $req.next(this.user);
    },
    (err) => {
      $req.error(err);
    });
    return $req;
  }

  public addRemoveTags(chipLog: ChipLog): void {
    this.http.patch(`${apiUrl}/user/add-remove-tags`, chipLog).subscribe(() => {});
  }

  public canContinue(path: string): Observable<boolean> {
    const $req = new Subject<boolean>();

    this.fetchUser().subscribe((res: User) => {
      const { verified }  = res;
      const isAVerificationRoute = ['verify', 'no-verified'].includes(path);
      if(isAVerificationRoute && verified) {
        void this.router.navigateByUrl('');
        $req.next(false);
      } else if(!isAVerificationRoute && !verified) {
        void this.router.navigateByUrl('no-verified');
        $req.next(false);
      } else {
        $req.next(true);
      }
    }, () => {
      void this.router.navigateByUrl('login');
      $req.next(false);
    });

    return $req;
  }
}

