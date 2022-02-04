import { Component } from '@angular/core';
import { CredentialService } from '../../services/credential.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {

  constructor(
      public credentialService: CredentialService,
      public userService: UserService
  ) { }

  get tags(): string[] {
    return this.credentialService.tagsByCredentials;
  }

  public toggleTag(tagName: string) {
    let value:string[] = [];
    if(this.credentialService.selectedTag$.value.includes(tagName)) {
      value = this.credentialService.selectedTag$.value.filter(tag => tag !== tagName);
    } else {
      value = [...this.credentialService.selectedTag$.value, tagName];
    }
    this.credentialService.selectedTag$.next(value);

  }

  public isTagActive(tagName: string): boolean {
    return this.credentialService.selectedTag$.value.includes(tagName);
  }

}
