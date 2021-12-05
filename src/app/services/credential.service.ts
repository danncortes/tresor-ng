import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Credential } from '../models/credential.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  public credentials$: BehaviorSubject<Credential[]> = new BehaviorSubject<Credential[]>([]);
  public isLoading: boolean;

  constructor(public http: HttpClient) { }

  public getCredentials(): void {
    this.isLoading = true;
    this.http.get<Credential[]>(`${apiUrl}/credentials`).subscribe((response: Credential[]) => {
      this.credentials$.next(response);
      this.isLoading = false;
    });
  }

}
