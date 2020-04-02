import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOperationComponent } from './delete-operation.component';

describe('DeleteOperationComponent', () => {
  let component: DeleteOperationComponent;
  let fixture: ComponentFixture<DeleteOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
