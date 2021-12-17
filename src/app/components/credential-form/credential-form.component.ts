import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CredentialForm, Field } from '../../models/credential.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-credential-form',
  templateUrl: './credential-form.component.html',
  styleUrls: ['./credential-form.component.scss']
})
export class CredentialFormComponent implements OnInit {

  @Input() credential: CredentialForm;
  @Output() credentialChange = new EventEmitter<CredentialForm>();
  credentialName: FormControl;

  constructor() {
  }

  ngOnInit(): void {
    this.credentialName = new FormControl(this.credential.name);
    this.credentialName.valueChanges.subscribe((value) => {
      this.credential.name = value;
      this.credentialChange.emit(this.credential);
    });
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

  trackByFn(index: number, item: any): number {
    return index;
  }
}
