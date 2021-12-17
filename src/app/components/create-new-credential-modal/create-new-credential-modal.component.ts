import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Credential, CredentialForm, Field } from '../../models/credential.model';

@Component({
  selector: 'app-create-new-credential-modal',
  templateUrl: './create-new-credential-modal.component.html',
  styleUrls: ['./create-new-credential-modal.component.scss']
})
export class CreateNewCredentialModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  emptyField: Field = {
    name: '',
    data: '',
    type: 'username'
  }

  newCredential: CredentialForm = {
    name: '',
    data: [{
      ...this.emptyField
    }],
    tags: ['bank', 'colombia']
  }

  ngOnInit(): void {
  }

  public createCredential(): void {
    console.log(this.newCredential);
  }
}
