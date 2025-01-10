import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReserveComponent } from './user-reserve.component';

describe('UserReserveComponent', () => {
  let component: UserReserveComponent;
  let fixture: ComponentFixture<UserReserveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserReserveComponent]
    });
    fixture = TestBed.createComponent(UserReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
