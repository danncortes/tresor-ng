import { Component, OnInit } from '@angular/core';
import { CredentialService } from '../../services/credential.service';
import { Credential } from '../../models/credential.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public credentialService: CredentialService) { }

  ngOnInit(): void {
    this.credentialService.getCredentials();
  }

  public get credentials(): Credential[] {
    return this.credentialService.credentials$.getValue();
  }

  public get isLoading(): boolean {
    return this.credentialService.isLoading;
  }
}
