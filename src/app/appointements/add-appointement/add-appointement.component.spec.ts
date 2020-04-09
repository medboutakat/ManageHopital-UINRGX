import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppointementComponent } from './add-appointement.component';

describe('AddAppointementComponent', () => {
  let component: AddAppointementComponent;
  let fixture: ComponentFixture<AddAppointementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppointementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppointementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
