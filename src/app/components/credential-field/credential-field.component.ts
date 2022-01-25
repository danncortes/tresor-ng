import { Component, Input } from '@angular/core';
import { Field } from '../../models/credential.model';

@Component({
  selector: 'app-credential-field',
  templateUrl: './credential-field.component.html',
  styleUrls: ['./credential-field.component.scss']
})
export class CredentialFieldComponent {

  @Input() field: Field;

}
