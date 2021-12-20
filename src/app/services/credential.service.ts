import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Credential, CredentialForm} from '../models/credential.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ChipLog} from "../components/chips/chips.component";

const {apiUrl} = environment;

const blankChipsLog: ChipLog = {
    add: [],
    remove: []
}

@Injectable({
    providedIn: 'root'
})
export class CredentialService {

    public credentials$: BehaviorSubject<Credential[]> = new BehaviorSubject<Credential[]>([]);
    public isLoading: boolean;
    public credentialChipLog: ChipLog = {...blankChipsLog}

    constructor(public http: HttpClient) {
    }

    public resetChipsLog():void {
        this.credentialChipLog = {...blankChipsLog}
    }

    public getCredentials(): void {
        this.isLoading = true;
        this.http.get<Credential[]>(`${apiUrl}/credentials`).subscribe((response: Credential[]) => {
            this.credentials$.next(response);
            this.isLoading = false;
        });
    }

    public createCredentials(credential: CredentialForm): void {
        this.isLoading = true;

        this.http.post<Credential>(`${apiUrl}/credential`, {...credential}).subscribe((response: Credential) => {
            this.credentials$.next([
              response,
              ...this.credentials$.value,
            ]);
            this.isLoading = false;
        });
    }

}
