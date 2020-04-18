import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {  HospitalCatEditComponent } from './hospital-edit-cat.component';

describe('HospitalCatEditComponent', () => {
  let component: HospitalCatEditComponent;
  let fixture: ComponentFixture<HospitalCatEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalCatEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalCatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
