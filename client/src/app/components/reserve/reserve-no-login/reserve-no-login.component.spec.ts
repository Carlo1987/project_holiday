import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveNoLoginComponent } from './reserve-no-login.component';

describe('ReserveNoLoginComponent', () => {
  let component: ReserveNoLoginComponent;
  let fixture: ComponentFixture<ReserveNoLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserveNoLoginComponent]
    });
    fixture = TestBed.createComponent(ReserveNoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
