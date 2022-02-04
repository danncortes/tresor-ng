import { Component, Input } from '@angular/core';
import { Credential } from '../../models/credential.model';

@Component({
  selector: 'app-credentials-list',
  templateUrl: './credentials-list.component.html',
  styleUrls: ['./credentials-list.component.scss']
})
export class CredentialsListComponent {

  @Input() credentials: Credential[];

}
