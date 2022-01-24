import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CredentialForm, Field } from '../../models/credential.model';
import { CredentialService } from '../../services/credential.service';
import { UserService } from '../../services/user.service';
import { forkJoin, merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-create-new-credential-modal',
  templateUrl: './create-new-credential-modal.component.html',
  styleUrls: ['./create-new-credential-modal.component.scss']
})
export class CreateNewCredentialModalComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

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

  ngOnInit(): void {
  }

  public createCredential(): void {
    this.subscriptions.push(
      this.credentialService.createCredentials(this.newCredential).subscribe(() => {
        this.activeModal.close();
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
