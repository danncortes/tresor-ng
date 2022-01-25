import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-new-vault-modal',
  templateUrl: './create-new-vault-modal.component.html',
  styleUrls: ['./create-new-vault-modal.component.scss']
})

export class CreateNewVaultModalComponent implements AfterViewInit {

    @ViewChild('vaultNameInput') public vaultNameInput: ElementRef<HTMLInputElement>;
    public vaultName = '';
    public isCreating = false;

    constructor(
        public activeModal: NgbActiveModal,
        public userService: UserService
    ) {
    }

    ngAfterViewInit(): void {
      this.vaultNameInput.nativeElement.focus();
    }

    public createNewVault(): void {
      const vaultName = this.vaultName.trim();
      this.isCreating = true;
      this.userService.createVault(vaultName).subscribe({
        next: () => {
          this.isCreating = false;
          this.activeModal.close();
        }
      });
    }

}
