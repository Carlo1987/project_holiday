import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentsComponent } from './instruments.component';

describe('InstrumentsComponent', () => {
  let component: InstrumentsComponent;
  let fixture: ComponentFixture<InstrumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstrumentsComponent]
    });
    fixture = TestBed.createComponent(InstrumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
