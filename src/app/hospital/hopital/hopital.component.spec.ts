import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopitalComponent } from './hopital.component';

describe('HopitalComponent', () => {
  let component: HopitalComponent;
  let fixture: ComponentFixture<HopitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
