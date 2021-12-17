import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialListItemComponent } from './credential-list-item.component';

describe('CredentialListItemComponent', () => {
  let component: CredentialListItemComponent;
  let fixture: ComponentFixture<CredentialListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
