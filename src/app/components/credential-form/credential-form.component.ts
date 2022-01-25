import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CredentialForm } from '../../models/credential.model';
import { FormControl } from '@angular/forms';
import { CredentialService } from '../../services/credential.service';
import { Vault } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-credential-form',
  templateUrl: './credential-form.component.html',
  styleUrls: ['./credential-form.component.scss']
})
export class CredentialFormComponent implements OnInit {

    @Input() credential: CredentialForm;
    @Output() credentialChange = new EventEmitter<CredentialForm>();
    credentialName: FormControl;
    selectedVault$: BehaviorSubject<Vault['_id'] | null> = new BehaviorSubject<Vault['_id'] | null>(null);

    constructor(public credentialService: CredentialService, public userService: UserService) {
    }

    ngOnInit(): void {
      this.credentialName = new FormControl(this.credential.name);
      this.credentialName.valueChanges.subscribe((value: string) => {
        this.credential.name = value;
        this.credentialChange.emit(this.credential);
      });

      this.selectedVault$.subscribe({
        next: (value) => {
          this.credential.vault = value;
          this.credentialChange.emit(this.credential);
        }
      });

      this.selectedVault$.next(this.userService.selectedVault$.value);
    }

    public get vaultDropdownLabel(): string {
      let label = 'None';

      if(this.selectedVault$.value) {
        const selectedVault = this.vaults.find(vault => vault._id === this.selectedVault$.value);

        if(selectedVault) {
          label = selectedVault.label;
        }
      }
      return label;
    }

    public get vaults(): Vault[] {
      return this.userService.vaults;
    }

    public removeField(index: number): void {
      this.credential.data = this.credential.data.filter((ele, i) => i !== index);
    }

    public addField(): void {
      this.credential.data.push({
        name: '',
        data: '',
        type: 'username'
      });
    }

    public selectVault(vaultId: Vault['_id'] | null): void {
      this.selectedVault$.next(vaultId);
    }

    trackByFn(index: number): number {
      return index;
    }
}
