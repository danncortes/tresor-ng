import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoVerifiedComponent } from './no-verified.component';

describe('NoVerifiedComponent', () => {
  let component: NoVerifiedComponent;
  let fixture: ComponentFixture<NoVerifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoVerifiedComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
