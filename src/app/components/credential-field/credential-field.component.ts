import { Component, Input, OnInit } from '@angular/core';
import { Field } from '../../models/credential.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-credential-field, [app-credential-field]',
  templateUrl: './credential-field.component.html',
  styleUrls: ['./credential-field.component.scss']
})
export class CredentialFieldComponent implements OnInit {

  constructor(public toast: ToastService) {
  }

    @Input() field: Field;
    public isDataVisible: boolean;

    ngOnInit() {
      this.isDataVisible = this.field.type !== 'password' || false;
    }

    public get fieldType(): string {
      return this.field.type === 'password' && !this.isDataVisible ? 'password' : 'text';
    }

    public toggleShowData(): void {
      this.isDataVisible = !this.isDataVisible;
    }

    public copyData(): void {
      void navigator.clipboard.writeText(`${this.field.data}`).then(() => {
        this.toast.notify(`${this.field.name} copied!`, 'info', 2000);
      });
    }

    public openMap(address: string | number): void {
      window.open(`https://www.google.com/maps/search/${address}`, '_blank');
    }

    public openUrl(url: string | number): void {
      window.open(`http://${url}`, '_blank');
    }

    public mailTo(emailAddress: string | number): void {
      window.location.href = `mailto:${emailAddress}`;
    }

}
