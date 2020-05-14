import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductimageComponent } from './productimage.component';

describe('ProductimageComponent', () => {
  let component: ProductimageComponent;
  let fixture: ComponentFixture<ProductimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
