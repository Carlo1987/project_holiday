import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveSingleComponent } from './reserve-single.component';

describe('ReserveSingleComponent', () => {
  let component: ReserveSingleComponent;
  let fixture: ComponentFixture<ReserveSingleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserveSingleComponent]
    });
    fixture = TestBed.createComponent(ReserveSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
