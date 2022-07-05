import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCredentialModalComponent } from './edit-credential-modal.component';

describe('EditCredentialModalComponent', () => {
  let component: EditCredentialModalComponent;
  let fixture: ComponentFixture<EditCredentialModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCredentialModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCredentialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
