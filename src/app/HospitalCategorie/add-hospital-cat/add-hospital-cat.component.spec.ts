import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHospitalCatComponent } from './add-hospital-cat.component';

describe('AddHospitalCatComponent', () => {
  let component: AddHospitalCatComponent;
  let fixture: ComponentFixture<AddHospitalCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHospitalCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHospitalCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
