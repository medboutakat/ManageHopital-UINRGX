import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditCatComponent } from './customer-edit-cat.component';

describe('CustomerEditCatComponent', () => {
  let component: CustomerEditCatComponent;
  let fixture: ComponentFixture<CustomerEditCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEditCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
