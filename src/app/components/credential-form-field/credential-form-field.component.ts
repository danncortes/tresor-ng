import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Field } from '../../models/credential.model';
import { fieldTypes, FieldType } from '../../models/credential.model';

@Component({
  selector: 'app-credential-form-field',
  templateUrl: './credential-form-field.component.html',
  styleUrls: ['./credential-form-field.component.scss']
})

export class CredentialFormFieldComponent implements OnInit {

  @Input() field: Field;
  @Output() fieldChange: EventEmitter<Field> = new EventEmitter<Field>();
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();

  fieldForm: FormGroup;
  name: FormControl;
  data: FormControl;
  type: FormControl;

  ngOnInit(): void {
    this.name = new FormControl(this.field.name, {
      updateOn: 'blur'
    });

    this.data = new FormControl(this.field.data, {
      updateOn: 'blur'
    });

    this.type = new FormControl(this.field.type);

    this.fieldForm = new FormGroup({
      name: this.name,
      data: this.data,
      type: this.type
    });

    this.fieldForm.valueChanges.subscribe(field => {
      this.fieldChange.emit(field);
    });
  }

  public get dataPlaceholder(): string {
    const nameField: AbstractControl | null = this.fieldForm.get('name');
    const name: string = nameField ? nameField.value as string : '';
    return `Insert ${name}`;
  }

  public get fieldTypes(): typeof fieldTypes {
    return fieldTypes;
  }

  public get selectedFieldType(): FieldType {
    return this.fieldForm.controls.type.value as FieldType;
  }

  public selectFieldType(value: string): void {
    this.fieldForm.controls.type.setValue(value);
  }

  public removeField(): void {
    this.remove.emit();
  }

}
