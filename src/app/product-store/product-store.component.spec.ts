import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStoreComponent } from './product-store.component';

describe('ProductStoreComponent', () => {
  let component: ProductStoreComponent;
  let fixture: ComponentFixture<ProductStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
