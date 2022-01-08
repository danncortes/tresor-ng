import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Vault} from "../../models/user.model";
import {CredentialService} from "../../services/credential.service";

@Component({
  selector: 'app-vaults',
  templateUrl: './vaults.component.html',
  styleUrls: ['./vaults.component.scss']
})
export class VaultsComponent implements OnInit {

  constructor(public userService: UserService, public credentialService: CredentialService) { }

  ngOnInit(): void {
    if(!this.isCredentialsFetch) {
      this.credentialService.getCredentials();
    }
  }

  public get vaults(): Vault[] {
    return this.userService.vaults;
  }

  public get isCredentialsFetch(): boolean {
    return this.credentialService.credentials$.value !== null
  }

  public credentialNumber(vaultId: Vault['_id']): number {
    return this.credentialService.credentialsPerVaultSummary[vaultId!]
  }
}
