import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthCredentials, BaseUser, User, Vault} from '../models/user.model';
import {TokenService} from './token.service';
import {Router} from '@angular/router';
import {ChipLog} from "../components/chips/chips.component";

const {apiUrl} = environment;

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public user: User;
    public selectedVault$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    public vaultAdded$: Subject<void> = new Subject();

    constructor(private http: HttpClient, public tokenService: TokenService, public router: Router) {
    }

    public get vaults(): Vault[] {
        return this.user.vaults
    }

    public isLoggedIn(): boolean {
        return !!this.tokenService.getToken();
    }

    public login(authCredentials: AuthCredentials): Observable<any> {
        const $req = new Subject<void>();
        this.http.post(`${apiUrl}/user/login`, authCredentials).subscribe((response: any) => {
                const {token} = response as { token: string };
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

        this.http.get<User>(`${apiUrl}/user`).subscribe({
            next: (response: User ): void => {
                const {_id, name, email, verified, vaults, tags} = response;
                this.user = {
                    _id, name, email, verified, vaults, tags
                };
                $req.next(this.user);
            },
            error: (err) => {
                $req.error(err);
            }
        })
        return $req;
    }

    public addRemoveTags(chipLog: ChipLog): void {
        this.http.patch(`${apiUrl}/user/add-remove-tags`, chipLog).subscribe(() => {
        });
    }

    public saveUser(user: BaseUser): Observable<User> {
        return this.http.patch<User>(`${apiUrl}/user`, user);
    }

    public updateUser(user: User): void {
        this.saveUser(user).subscribe();
    }

    public createVault(vaultName: string): Observable<unknown> {
        const req$ = new Subject<void>();
        let {_id, email, ...newUser} = this.user
        const newVault: Vault = {
            label: vaultName
        }

        newUser = {
            ...newUser,
            vaults: [
                ...newUser.vaults,
                newVault
            ]
        }

        this.saveUser(newUser).subscribe({
            next: (user) => {
                this.user = {
                    ...this.user,
                    vaults: [
                        ...user.vaults
                    ]
                }

                req$.next();

                const newVaultId = user.vaults.find(vault => vault.label === newVault.label)!._id;
                this.selectedVault$.next(newVaultId!);
            }
        })

        return req$;
    }

    public canContinue(path: string): Observable<boolean> {
        const $req = new Subject<boolean>();

        this.fetchUser().subscribe((res: User) => {
            const {verified} = res;
            const isAVerificationRoute = ['verify', 'no-verified'].includes(path);
            if (isAVerificationRoute && verified) {
                void this.router.navigateByUrl('');
                $req.next(false);
            } else if (!isAVerificationRoute && !verified) {
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

