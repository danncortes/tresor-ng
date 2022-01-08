import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CredentialForm} from '../../models/credential.model';
import {FormControl} from '@angular/forms';
import {CredentialService} from "../../services/credential.service";
import {ChipLog} from "../chips/chips.component";
import {Vault} from "../../models/user.model";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-credential-form',
    templateUrl: './credential-form.component.html',
    styleUrls: ['./credential-form.component.scss']
})
export class CredentialFormComponent implements OnInit {

    @Input() credential: CredentialForm;
    @Output() credentialChange = new EventEmitter<CredentialForm>();
    credentialName: FormControl;
    selectedVault$: BehaviorSubject<Vault["_id"] | null> = new BehaviorSubject<Vault["_id"] | null>(null);

    constructor(public credentialService: CredentialService, public userService: UserService) {
    }

    ngOnInit(): void {
        this.credentialName = new FormControl(this.credential.name);
        this.credentialName.valueChanges.subscribe((value) => {
            this.credential.name = value;
            this.credentialChange.emit(this.credential);
        });

        this.selectedVault$.subscribe({
            next: (value) => {
                this.credential.vault = value;
                this.credentialChange.emit(this.credential);
            }
        })

        this.selectedVault$.next(this.userService.selectedVault$.value)
    }

    public get vaultDropdownLabel(): string {
        return this.selectedVault$.value ? this.vaults.find(vault => vault._id === this.selectedVault$.value)!.label : 'None';
    }

    public get vaults(): Vault[] {
        return this.userService.vaults
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

    public selectVault(vaultId: Vault["_id"] | null): void {
        this.selectedVault$.next(vaultId)
    }

    public updateCredentialChipLog(chipLog: ChipLog) {
        this.credentialService.credentialChipLog = chipLog;
    }

    trackByFn(index: number, item: any): number {
        return index;
    }
}
