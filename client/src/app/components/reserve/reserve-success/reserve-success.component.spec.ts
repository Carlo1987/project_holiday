import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveSuccessComponent } from './reserve-success.component';

describe('ReserveSuccessComponent', () => {
  let component: ReserveSuccessComponent;
  let fixture: ComponentFixture<ReserveSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserveSuccessComponent]
    });
    fixture = TestBed.createComponent(ReserveSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
