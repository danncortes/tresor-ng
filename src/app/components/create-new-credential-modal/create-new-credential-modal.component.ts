import { Component, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CredentialForm, Field } from '../../models/credential.model';
import { CredentialService } from '../../services/credential.service';
import { UserService } from '../../services/user.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-create-new-credential-modal',
  templateUrl: './create-new-credential-modal.component.html',
  styleUrls: ['./create-new-credential-modal.component.scss']
})
export class CreateNewCredentialModalComponent implements OnDestroy {

  private subscriptions: Subscription[] = [];
  public isSaving = false;

  constructor(
        public activeModal: NgbActiveModal,
        public credentialService: CredentialService,
        public userService: UserService
  ) {
  }

  emptyField: Field = {
    name: '',
    data: '',
    type: 'username'
  };

  newCredential: CredentialForm = {
    name: '',
    data: [{
      ...this.emptyField
    }],
    tags: [],
    vault: null
  };

  public createCredential(): void {
    this.isSaving = true;

    this.subscriptions.push(
      this.credentialService.createCredentials(this.newCredential).subscribe(() => {
        this.activeModal.close();
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
    return this.isSaving ||
        !this.newCredential.name ||
        this.newCredential.data.every(field => field.name === '');
  }
}
