import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialFieldComponent } from './credential-field.component';

describe('CredentialFieldComponent', () => {
  let component: CredentialFieldComponent;
  let fixture: ComponentFixture<CredentialFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialFieldComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
