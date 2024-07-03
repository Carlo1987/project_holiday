import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewNoLoginComponent } from './review-no-login.component';

describe('ReviewNoLoginComponent', () => {
  let component: ReviewNoLoginComponent;
  let fixture: ComponentFixture<ReviewNoLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewNoLoginComponent]
    });
    fixture = TestBed.createComponent(ReviewNoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
