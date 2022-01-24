import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, iif, map, Observable, of, Subject, switchMap } from 'rxjs';
import { Credential, CredentialForm } from '../models/credential.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { Vault } from '../models/user.model';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  public credentials$: BehaviorSubject<Credential[] | null> = new BehaviorSubject<Credential[] | null>(null);
  public filteredCredentials$: BehaviorSubject<Credential[] | null> = new BehaviorSubject<Credential[] | null>([]);

  public credentialsPerVaultSummary: {[key: string]: number};
  public isLoading: boolean;

  constructor(public http: HttpClient, public userService: UserService) {
    combineLatest([
      this.credentials$,
      this.userService.selectedVault$
    ]).pipe(map(([credentials, selectedVault]): Credential[] | null => {

      let filteredCredentials: Credential[] = [];

      if (credentials && credentials.length === 0) {
        return null;
      } else if(credentials) {
        filteredCredentials = credentials;
      }

      if (selectedVault) {
        filteredCredentials = filteredCredentials.filter((credential: Credential) => {
          return credential.vault === selectedVault;
        });
      }

      return filteredCredentials;

    })).subscribe((credentials) => {
      this.filteredCredentials$.next(credentials);
    });
  }

  private buildCredentialsPerVaultSummary(vaults: Vault[], credentials: Credential[]): {[key: string]: number} {
    const summary: {[key: string]: number} = {
    };

    for(const vault of vaults) {
      summary[`${vault._id}`] = 0;
    }

    for(const credential of credentials) {
      summary[`${credential.vault}`]++;
    }

    return summary;
  }

  public getCredentials(): void {
    this.isLoading = true;
    this.http.get<Credential[]>(`${apiUrl}/credentials`).subscribe((response: Credential[]) => {
      this.credentials$.next(response);
      this.credentialsPerVaultSummary = this.buildCredentialsPerVaultSummary(this.userService.vaults, response);
      this.isLoading = false;
    });
  }

  public createCredentials(credential: CredentialForm): Subject<string> {
    const req$: Subject<string> = new Subject();

    this.isLoading = true;

    this.http.post<Credential>(`${apiUrl}/credential`, {
      ...credential 
    }).subscribe({
      next: (response: Credential) => {
        const credentials = this.credentials$.value ? this.credentials$.value : [];

        this.credentials$.next([
          response,
          ...credentials
        ]);
        this.isLoading = false;
        req$.next('Created');
      },
      error: () => {
        req$.error('Error creating credential');
      }
    });
        
    return req$;
  }

}
