import { Component, Input, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash';

import { CredentialService } from '../../services/credential.service';
import { ToastService } from '../../services/toast.service';
import { CredentialForm } from '../../models/credential.model';

@Component({
  selector: 'app-edit-credential-modal',
  templateUrl: './edit-credential-modal.component.html',
  styleUrls: ['./edit-credential-modal.component.scss']
})
export class EditCredentialModalComponent implements OnInit{

  @Input() credential: CredentialForm;
  private subscriptions: Subscription[] = [];
  public isSaving = false;
  public credentialCopy: CredentialForm;

  constructor(
      public activeModal: NgbActiveModal,
      public credentialService: CredentialService,
      public toastService: ToastService
  ) {

  }

  public ngOnInit() {
    this.credentialCopy = cloneDeep(this.credential);
  }

  public saveCredential(): void {
    this.isSaving = true;

    this.subscriptions.push(
      this.credentialService.updateCredential(this.credentialCopy).subscribe(() => {
        this.activeModal.close();
        this.toastService.notify('Credential Updated', 'success');
      }, () => {
        this.isSaving = false;
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public get saveButtonDisabled(): boolean {
    return false;
    return this.isSaving ||
        !this.credential.name ||
        this.credential.data.every(field => field.name === '');
  }

}
