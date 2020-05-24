import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxEditComponent } from './tax-edit.component';

describe('DoctorEditCatComponent', () => {
  let component: TaxEditComponent;
  let fixture: ComponentFixture<TaxEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
