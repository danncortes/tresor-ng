import { Component, OnInit } from '@angular/core';
import { CredentialService } from '../../services/credential.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateNewCredentialModalComponent } from '../create-new-credential-modal/create-new-credential-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public credentialService: CredentialService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.credentialService.getCredentials();
  }

  public get isLoading(): boolean {
    return this.credentialService.isLoading;
  }

  public openCreateNewModal():void {
    this.modalService.open(CreateNewCredentialModalComponent, {
      centered: true,
      scrollable: false,
      size: 'lg' 
    });
  }
}
