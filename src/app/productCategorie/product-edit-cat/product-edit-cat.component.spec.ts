import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditCatComponent } from './product-edit-cat.component';

describe('ProductEditCatComponent', () => {
  let component: ProductEditCatComponent;
  let fixture: ComponentFixture<ProductEditCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEditCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
