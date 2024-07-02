import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReservesClientsComponent } from './all-reserves-clients.component';

describe('AllReservesClientsComponent', () => {
  let component: AllReservesClientsComponent;
  let fixture: ComponentFixture<AllReservesClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllReservesClientsComponent]
    });
    fixture = TestBed.createComponent(AllReservesClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
