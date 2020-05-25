import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalCatComponent } from './cat.component';

describe('HospitalCatComponent', () => {
  let component: HospitalCatComponent;
  let fixture: ComponentFixture<HospitalCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
