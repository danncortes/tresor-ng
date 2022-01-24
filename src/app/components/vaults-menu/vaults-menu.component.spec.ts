import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultsMenuComponent } from './vaults-menu.component';

describe('VaultsMenuComponent', () => {
  let component: VaultsMenuComponent;
  let fixture: ComponentFixture<VaultsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaultsMenuComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaultsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
