import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { CredentialService } from '../../services/credential.service';

@Component({
  selector: 'app-create-new-vault-modal',
  templateUrl: './create-new-vault-modal.component.html',
  styleUrls: ['./create-new-vault-modal.component.scss']
})

export class CreateNewVaultModalComponent {
  public vaultName = '';
  public isCreating = false;

  constructor(
        public activeModal: NgbActiveModal,
        public userService: UserService,
        public credentialService: CredentialService
  ) {
  }

  public createNewVault(): void {
    const vaultName = this.vaultName.trim();
    this.isCreating = true;
    this.userService.createVault(vaultName).subscribe({
      next: (vaultId) => {
        this.isCreating = false;
        this.activeModal.close();
        this.credentialService.selectVault(vaultId);
      }
    });
  }

}
