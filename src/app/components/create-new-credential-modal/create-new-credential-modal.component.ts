import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CredentialForm, Field} from '../../models/credential.model';
import {CredentialService} from "../../services/credential.service";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-create-new-credential-modal',
    templateUrl: './create-new-credential-modal.component.html',
    styleUrls: ['./create-new-credential-modal.component.scss']
})
export class CreateNewCredentialModalComponent implements OnInit {

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
    }

    newCredential: CredentialForm = {
        name: '',
        data: [{
            ...this.emptyField
        }],
        tags: []
    }

    ngOnInit(): void {
    }

    public createCredential(): void {
        this.credentialService.createCredentials(this.newCredential)
        this.userService.addRemoveTags(this.credentialService.credentialChipLog)
        this.credentialService.resetChipsLog()
        this.activeModal.close()
    }
}
