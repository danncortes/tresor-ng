import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Credential } from '../models/credential.model';
import { Subscription } from 'rxjs';
import { CredentialService } from '../services/credential.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-confirm-delete-credential-modal',
  templateUrl: './confirm-delete-credential-modal.component.html',
  styleUrls: ['./confirm-delete-credential-modal.component.scss']
})
export class ConfirmDeleteCredentialModalComponent {

  @Input() credential: Credential;
  public subscriptions: Subscription[] = [];
  public isDeleting = false;

  constructor(
      public activeModal: NgbActiveModal,
      public credentialService: CredentialService,
      public toast: ToastService
  ) { }

  public deleteCredential(id: Credential['_id']): void {
    this.isDeleting = true;
    this.subscriptions.push(
      this.credentialService.deleteCredential(id).subscribe((res) => {
        this.toast.notify(`Credential ${res.name} deleted!`, 'success');
        this.activeModal.close();
      })
    );
  }
}
