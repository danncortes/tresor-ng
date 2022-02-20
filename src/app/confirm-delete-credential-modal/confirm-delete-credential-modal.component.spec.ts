import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteCredentialModalComponent } from './confirm-delete-credential-modal.component';

describe('ConfirmDeleteCredentialModalComponent', () => {
  let component: ConfirmDeleteCredentialModalComponent;
  let fixture: ComponentFixture<ConfirmDeleteCredentialModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteCredentialModalComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteCredentialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
