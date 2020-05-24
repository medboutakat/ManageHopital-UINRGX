import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CatEditComponent } from "./edit-cat.component";

describe("CatEditComponent", () => {
  let component: CatEditComponent;
  let fixture: ComponentFixture<CatEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatEditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
