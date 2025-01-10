import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveRejectedComponent } from './reserve-rejected.component';

describe('ReserveRejectedComponent', () => {
  let component: ReserveRejectedComponent;
  let fixture: ComponentFixture<ReserveRejectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserveRejectedComponent]
    });
    fixture = TestBed.createComponent(ReserveRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
