import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCatComponent } from './doctor-cat.component';

describe('DoctorCatComponent', () => {
  let component: DoctorCatComponent;
  let fixture: ComponentFixture<DoctorCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
