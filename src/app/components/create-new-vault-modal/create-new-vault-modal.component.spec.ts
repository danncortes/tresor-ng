import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewVaultModalComponent } from './create-new-vault-modal.component';

describe('CreateNewVaultModalComponent', () => {
  let component: CreateNewVaultModalComponent;
  let fixture: ComponentFixture<CreateNewVaultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewVaultModalComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewVaultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
