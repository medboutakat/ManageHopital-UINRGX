import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalCatAddComponent } from './hospital-cat-add.component';

describe('HospitalCatAddComponent', () => {
  let component: HospitalCatAddComponent;
  let fixture: ComponentFixture<HospitalCatAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalCatAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalCatAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
