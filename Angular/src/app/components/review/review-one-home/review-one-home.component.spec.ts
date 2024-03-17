import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOneHomeComponent } from './review-one-home.component';

describe('ReviewOneHomeComponent', () => {
  let component: ReviewOneHomeComponent;
  let fixture: ComponentFixture<ReviewOneHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewOneHomeComponent]
    });
    fixture = TestBed.createComponent(ReviewOneHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
