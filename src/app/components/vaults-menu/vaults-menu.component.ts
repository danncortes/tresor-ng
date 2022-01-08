import {Component, OnInit} from '@angular/core';
import {User, Vault} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {CreateNewVaultModalComponent} from "../create-new-vault-modal/create-new-vault-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-vaults-menu',
    templateUrl: './vaults-menu.component.html',
    styleUrls: ['./vaults-menu.component.scss']
})
export class VaultsMenuComponent implements OnInit {

    constructor(public userService: UserService, public modalService: NgbModal) {
    }

    ngOnInit(): void {
    }

    public get vaults(): Vault[] {
        return this.userService.vaults
    }

    public isActive(vaultId: Vault["_id"] | null): boolean {
        return this.userService.selectedVault$.value === vaultId
    }

    public selectVault(vaultId: Vault["_id"] | null): void {
        this.userService.selectedVault$.next(vaultId!)
    }

    public openCreateNewVaultModal(): void {
        this.modalService.open(CreateNewVaultModalComponent, {
            centered: true,
            scrollable: false,
            size: 'sm'
        });
    }
}
