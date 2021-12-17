import { Component, Input, OnInit } from '@angular/core';
import { Credential } from '../../models/credential.model';

@Component({
  selector: 'app-credential-list-item',
  templateUrl: './credential-list-item.component.html',
  styleUrls: ['./credential-list-item.component.scss']
})
export class CredentialListItemComponent implements OnInit {

  @Input() credential: Credential

  public constructor() { }

  ngOnInit(): void {
  }

  public isCollapsed = true;

}
