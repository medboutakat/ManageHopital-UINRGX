import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCatComponent } from './customer-cat.component';

describe('CustomerCatComponent', () => {
  let component: CustomerCatComponent;
  let fixture: ComponentFixture<CustomerCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
