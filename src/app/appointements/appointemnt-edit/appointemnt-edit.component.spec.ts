import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointemntEditComponent } from './appointemnt-edit.component';

describe('AppointemntEditComponent', () => {
  let component: AppointemntEditComponent;
  let fixture: ComponentFixture<AppointemntEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointemntEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointemntEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
