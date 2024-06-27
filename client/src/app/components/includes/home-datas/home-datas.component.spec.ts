import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDatasComponent } from './home-datas.component';

describe('HomeDatasComponent', () => {
  let component: HomeDatasComponent;
  let fixture: ComponentFixture<HomeDatasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDatasComponent]
    });
    fixture = TestBed.createComponent(HomeDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
