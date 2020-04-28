import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorEditCatComponent } from './doctor-edit-cat.component';

describe('DoctorEditCatComponent', () => {
  let component: DoctorEditCatComponent;
  let fixture: ComponentFixture<DoctorEditCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorEditCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorEditCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
