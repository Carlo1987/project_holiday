import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyReviewComponent } from './modify-review.component';

describe('ModifyReviewComponent', () => {
  let component: ModifyReviewComponent;
  let fixture: ComponentFixture<ModifyReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyReviewComponent]
    });
    fixture = TestBed.createComponent(ModifyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
