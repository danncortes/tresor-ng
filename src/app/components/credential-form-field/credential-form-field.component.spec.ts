import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialFormFieldComponent } from './credential-form-field.component';

describe('CredentialFormFieldComponent', () => {
  let component: CredentialFormFieldComponent;
  let fixture: ComponentFixture<CredentialFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialFormFieldComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
