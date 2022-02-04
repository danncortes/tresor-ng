import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Credential, Field } from '../../models/credential.model';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { decryptDataObj } from '../../utils/cryptDecrypt';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-credential-list-item',
  templateUrl: './credential-list-item.component.html',
  styleUrls: ['./credential-list-item.component.scss']
})
export class CredentialListItemComponent implements AfterViewInit {

    @ViewChild('collapse') collapse: NgbCollapse;
    @Input() credential: Credential;
    public isCollapsed = true;
    public decryptedData: null | Field[];

    ngAfterViewInit() {
      this.collapse.hidden.subscribe(() => {
        this.decryptedData = null;
      });
    }

    public toggleCollapse(): void {
      if (this.isCollapsed) {
        this.open();
      } else {
        this.close();
      }
    }

    public open(): void {
      this.decryptData().subscribe((data: Field[]) => {
        this.decryptedData = data;
        setTimeout(() => {
          this.collapse.toggle(true);
        }, 0);
      }, error => {
        console.log(error);
      });
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


}
