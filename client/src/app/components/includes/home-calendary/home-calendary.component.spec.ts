import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCalendaryComponent } from './home-calendary.component';

describe('HomeCalendaryComponent', () => {
  let component: HomeCalendaryComponent;
  let fixture: ComponentFixture<HomeCalendaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCalendaryComponent]
    });
    fixture = TestBed.createComponent(HomeCalendaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
