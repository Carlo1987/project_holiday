import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesCarouselComponent } from './homes-carousel.component';

describe('HomesCarouselComponent', () => {
  let component: HomesCarouselComponent;
  let fixture: ComponentFixture<HomesCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomesCarouselComponent]
    });
    fixture = TestBed.createComponent(HomesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
