import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteReserveComponent } from './complete-reserve.component';

describe('CompleteReserveComponent', () => {
  let component: CompleteReserveComponent;
  let fixture: ComponentFixture<CompleteReserveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteReserveComponent]
    });
    fixture = TestBed.createComponent(CompleteReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
