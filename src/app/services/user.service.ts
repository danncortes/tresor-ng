import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthCredentials, BaseUser, User, Vault } from '../models/user.model';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;

  constructor(
      private http: HttpClient,
      public tokenService: TokenService,
      public router: Router
  ) {
  }

  public get vaults(): Vault[] {
    return this.user.vaults;
  }

  public isLoggedIn(): boolean {
    return !!this.tokenService.getToken();
  }

  public login(authCredentials: AuthCredentials): Observable<any> {
    const req$ = new Subject<void>();
    this.http.post(`${apiUrl}/user/login`, authCredentials).subscribe((response: any) => {
      const { token } = response as { token: string };
      this.tokenService.saveToken(token);
      window.sessionStorage.setItem('masterp', authCredentials.masterPassword);

      req$.next();
    },
    (err) => {
      req$.error(err);
    });
    return req$;
  }

  public fetchUser(): Observable<any> {
    const req$ = new Subject();

    this.http.get<User>(`${apiUrl}/user`).subscribe({
      next: (response: User ): void => {
        const { _id, name, email, verified, vaults, tags } = response;
        this.user = {
          _id, name, email, verified, vaults, tags
        };
        req$.next(this.user);
      },
      error: (err) => {
        req$.error(err);
      }
    });
    return req$;
  }

  public saveUser(user: BaseUser): Observable<User> {
    return this.http.patch<User>(`${apiUrl}/user`, user);
  }

  public updateUser(user: User): void {
    this.saveUser(user).subscribe();
  }

  public createVault(vaultName: string): Observable<Vault['_id']> {
    const req$ = new Subject<Vault['_id']>();
    const { _id, email, ...user } = this.user;
    const newVault: Vault = {
      label: vaultName
    };

    const newUser = {
      ...user,
      vaults: [
        ...user.vaults,
        newVault
      ]
    };

    this.saveUser(newUser).subscribe({
      next: (user) => {
        this.user = {
          ...this.user,
          vaults: [
            ...user.vaults
          ]
        };

        const newVaultId = user.vaults.find(vault => vault.label === newVault.label)?._id;

        req$.next(newVaultId);
      }
    });

    return req$;
  }

  public deleteVault(vaultId: Vault['_id']): Observable<void> {
    const req$ = new Subject<void>();

    const newVaults = this.user.vaults.filter(vault => vault._id != vaultId);
    const { _id, email, ...user } = this.user;
    const newUser = {
      ...user,
      vaults: newVaults
    };

    this.saveUser(newUser).subscribe({
      next: (user) => {

        this.user = {
          ...this.user,
          vaults: newVaults
        };
        req$.next();
      }
    });

    return req$;
  }

  public canContinue(path: string): Observable<boolean> {
    const req$ = new Subject<boolean>();

    this.fetchUser().subscribe((res: User) => {
      const { verified } = res;
      const isAVerificationRoute = ['verify', 'no-verified'].includes(path);
      if (isAVerificationRoute && verified) {
        void this.router.navigateByUrl('');
        req$.next(false);
      } else if (!isAVerificationRoute && !verified) {
        void this.router.navigateByUrl('no-verified');
        req$.next(false);
      } else {
        req$.next(true);
      }
    }, () => {
      this.tokenService.signOut();
      void this.router.navigateByUrl('/login');
      req$.next(false);
    });

    return req$;
  }
}

