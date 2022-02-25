import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, Subject } from 'rxjs';
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
  public filterBy$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public selectedTag$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public selectedVault$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public isLoading: boolean;

  constructor(public http: HttpClient, public userService: UserService) {
    combineLatest([
      this.credentials$,
      this.selectedVault$,
      this.selectedTag$,
      this.filterBy$
    ]).pipe(map(([credentials, selectedVault, selectedTag, filterBy]): Credential[] | null => {

      let filteredCredentials: Credential[] = [];

      if (credentials && credentials.length === 0) {
        return null;
      } else if (credentials) {
        filteredCredentials = credentials;
      }

      if (selectedVault) {
        filteredCredentials = filteredCredentials.filter((credential: Credential) => {
          return credential.vault === selectedVault;
        });
      }

      if (selectedTag.length) {
        filteredCredentials = filteredCredentials.filter((credential: Credential) => {
          return selectedTag.some(tag => credential.tags.includes(tag));
        });
      }

      if (filterBy) {
        filteredCredentials = filteredCredentials.filter((credential: Credential) => {
          return credential.name.toLowerCase().includes(filterBy.toLowerCase());
        });
      }

      return filteredCredentials;

    })).subscribe((credentials) => {
      this.filteredCredentials$.next(credentials);
    });

    this.selectedVault$.subscribe(vault => {
      this.resetSelectedTags(vault);
    });
  }

  get tagsByCredentials(): string[] {
    const credentials = this.credentials$.value ? this.credentials$.value : [];
    const filteredCredentials = this.selectedVault$.value ?
      credentials.filter(credential => credential.vault === this.selectedVault$.value) :
      credentials;

    const tags: string[] = [];

    filteredCredentials.forEach((credential: Credential) => {
      tags.push(...credential.tags);
    });

    return [...new Set(tags)];
  }

  public resetSelectedTags(vault: string | null): void {
    const credentials = this.credentials$.value?.filter(credential => credential.vault === vault);

    const noRelatedTags = credentials && !this.selectedTag$.value.some(tag => credentials.some(cred => cred.tags.includes(tag)));
    if (noRelatedTags) {
      this.selectedTag$.next([]);
    }
  }

  public selectVault(vaultId: Vault['_id']) {
    if(vaultId) {
      this.selectedVault$.next(vaultId);
    }
  }

  public getCredentials(): void {
    this.isLoading = true;
    this.http.get<Credential[]>(`${apiUrl}/credentials`).subscribe((response: Credential[]) => {
      this.credentials$.next(response);
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
  
  public deleteCredential(id: Credential['_id']): Observable<Credential> {
    const req$ = new Subject<Credential>();

    this.http.delete<Credential>(`${apiUrl}/credential/${id}`).subscribe((res) => {
      req$.next(res);

      if(this.credentials$.value) {
        this.credentials$.next(
          this.credentials$.value.filter(credential => credential._id !== res._id)
        );
      }
    });

    return req$;
  }

}
