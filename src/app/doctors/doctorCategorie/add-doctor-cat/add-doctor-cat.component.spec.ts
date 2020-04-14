import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorCatComponent } from './add-doctor-cat.component';

describe('AddDoctorCatComponent', () => {
  let component: AddDoctorCatComponent;
  let fixture: ComponentFixture<AddDoctorCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDoctorCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
