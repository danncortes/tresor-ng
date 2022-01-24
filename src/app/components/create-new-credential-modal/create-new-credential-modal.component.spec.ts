import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewCredentialModalComponent } from './create-new-credential-modal.component';

describe('CreateNewCredentialModalComponent', () => {
  let component: CreateNewCredentialModalComponent;
  let fixture: ComponentFixture<CreateNewCredentialModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewCredentialModalComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewCredentialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
