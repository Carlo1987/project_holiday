import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveBlockedComponent } from './reserve-blocked.component';

describe('ReserveBlockedComponent', () => {
  let component: ReserveBlockedComponent;
  let fixture: ComponentFixture<ReserveBlockedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserveBlockedComponent]
    });
    fixture = TestBed.createComponent(ReserveBlockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
