import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { Vault } from '../../models/user.model';
import { CredentialService } from '../../services/credential.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-vaults',
  templateUrl: './vaults.component.html',
  styleUrls: ['./vaults.component.scss']
})
export class VaultsComponent implements OnInit {

  constructor(
      public userService: UserService,
      public credentialService: CredentialService,
      public toast: ToastService
  ) { }

  ngOnInit(): void {
    if(!this.isCredentialsFetch) {
      this.credentialService.getCredentials();
    }
  }

  public get vaults(): Vault[] {
    return this.userService.vaults;
  }

  public get isCredentialsFetch(): boolean {
    return this.credentialService.credentials$.value !== null;
  }

  public credentialNumber(vaultId: string): number {
    return this.credentialsPerVaultSummarycredentials[vaultId];
  }

  public get credentialsPerVaultSummarycredentials(): { [key: string]: number } {
    const summary: { [key: string]: number } = {
    };

    const { vaults } = this.userService;
    const credentials = this.credentialService.credentials$.value;

    for (const vault of vaults) {
      if (vault._id) {
        summary[vault._id] = 0;
      }
    }

    if(credentials) {
      for (const credential of credentials) {
        if (credential.vault) {
          summary[credential.vault]++;
        }
      }
    }

    return summary;
  }

  public deleteVault(vaultId: Vault['_id']): void {
    this.userService.deleteVault(vaultId).subscribe(() => {
      this.toast.notify('Vault deleted', 'success');
    });
  }
}
