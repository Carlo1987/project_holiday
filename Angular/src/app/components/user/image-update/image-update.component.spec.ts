import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUpdateComponent } from './image-update.component';

describe('ImageUpdateComponent', () => {
  let component: ImageUpdateComponent;
  let fixture: ComponentFixture<ImageUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageUpdateComponent]
    });
    fixture = TestBed.createComponent(ImageUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
