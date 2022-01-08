import { Component, OnInit } from '@angular/core';
import { Credential } from '../../models/credential.model';
import { CredentialService } from '../../services/credential.service';

@Component({
  selector: 'app-credentials-list',
  templateUrl: './credentials-list.component.html',
  styleUrls: ['./credentials-list.component.scss']
})
export class CredentialsListComponent {

  constructor(public credentialService: CredentialService) { }

  public get credentials(): Credential[] | null {
    return this.credentialService.filteredCredentials$.getValue();
  }

}
