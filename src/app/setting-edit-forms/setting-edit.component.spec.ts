import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingEditComponent } from './setting-edit.component';

describe('CategoryComponent', () => {
  let component: SettingEditComponent;
  let fixture: ComponentFixture<SettingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
