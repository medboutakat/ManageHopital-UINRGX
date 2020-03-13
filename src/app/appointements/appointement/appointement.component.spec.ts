import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointementComponent } from './appointement.component';

describe('AppointementComponent', () => {
  let component: AppointementComponent;
  let fixture: ComponentFixture<AppointementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
