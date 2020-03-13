import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSmallComponent } from './navbar-small.component';

describe('NavbarSmallComponent', () => {
  let component: NavbarSmallComponent;
  let fixture: ComponentFixture<NavbarSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
