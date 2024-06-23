import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReserveComponent } from './search-reserve.component';

describe('SearchReserveComponent', () => {
  let component: SearchReserveComponent;
  let fixture: ComponentFixture<SearchReserveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchReserveComponent]
    });
    fixture = TestBed.createComponent(SearchReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
