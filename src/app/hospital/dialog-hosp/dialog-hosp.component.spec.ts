import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHospComponent } from './dialog-hosp.component';

describe('DialogHospComponent', () => {
  let component: DialogHospComponent;
  let fixture: ComponentFixture<DialogHospComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHospComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHospComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
