import { Component, Input } from '@angular/core';
import { Vault } from '../../models/user.model';

@Component({
  selector: 'app-vault-list-item, [app-vault-list-item]',
  templateUrl: './vault-list-item.component.html',
  styleUrls: ['./vault-list-item.component.scss']
})
export class VaultListItemComponent {

  @Input() vault: Vault;
  @Input() credentialNumber: number;

}
