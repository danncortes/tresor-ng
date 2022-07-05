import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Credential, CredentialForm, Field } from '../../models/credential.model';
import { NgbCollapse, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { decryptDataObj } from '../../utils/cryptDecrypt';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CredentialService } from '../../services/credential.service';
import { ToastService } from '../../services/toast.service';
import { ConfirmDeleteCredentialModalComponent } from '../../confirm-delete-credential-modal/confirm-delete-credential-modal.component';
import { EditCredentialModalComponent } from '../edit-credential-modal/edit-credential-modal.component';

@Component({
  selector: 'app-credential-list-item',
  templateUrl: './credential-list-item.component.html',
  styleUrls: ['./credential-list-item.component.scss']
})
export class CredentialListItemComponent implements AfterViewInit {

  constructor(
      private credentialService: CredentialService,
      private toast: ToastService,
      public modalService: NgbModal
  ) {
  }

    @ViewChild('collapse') collapse: NgbCollapse;
    @Input() credential: Credential;
    public isCollapsed = true;
    public decryptedData: null | Field[];
    public subscriptions: Subscription[] = [];

    ngAfterViewInit() {
      this.subscriptions.push(
        this.collapse.hidden.subscribe(() => {
          this.decryptedData = null;
        })
      );
    }

    public toggleCollapse(): void {
      if (this.isCollapsed) {
        this.open();
      } else {
        this.close();
      }
    }

    public open(): void {
      this.subscriptions.push(
        this.decryptData().subscribe((data: Field[]) => {
          this.decryptedData = data;
          setTimeout(() => {
            this.collapse.toggle(true);
          }, 0);
        }, error => {
          console.log(error);
        })
      );
    }

    public close(): void {
      this.collapse.toggle(false);
    }

    public decryptData(): Observable<any> {
      return of(sessionStorage.getItem('masterp')).pipe(switchMap((masterp) => of(decryptDataObj(this.credential.data, masterp!))));
    }

    get updateDate(): string {
      const date = new Date(this.credential.updatedAt);
      return date.toLocaleDateString('en', {
        weekday: 'short', // possible values: 'long', 'short', 'narrow'
        year: 'numeric', // possible values: 'numeric', '2-digit'
        month: 'short', // possible values: 'numeric', '2-digit', 'long', 'short', 'narrow'
        day: 'numeric' // possible values: 'numeric', '2-digit'
      });
    }

    public deleteCredential(event: Event) {
      event.stopPropagation();

      const confirmDeleteCredentialModal = this.modalService.open(ConfirmDeleteCredentialModalComponent, {
        centered: true,
        scrollable: false,
        size: 'md'
      });

      confirmDeleteCredentialModal.componentInstance.credential = this.credential;
    }

    public editCredential(event: Event) {
      event.stopPropagation();

      const editCredentialModal = this.modalService.open(EditCredentialModalComponent, {
        centered: true,
        scrollable: false,
        size: 'lg'
      });

      const { vault, name, tags, _id } = this.credential;

      this.decryptData().subscribe((data: Field[]) => {
        editCredentialModal.componentInstance.credential = {
          _id, vault, name, tags, data
        };
      });
    }
}
