import { Component, OnInit, ViewChild } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as ActionsFile from "src/app/HospitalCategorie/Store/Action";
import {
  MatDialog,
  MatBottomSheetRef,
  MatBottomSheet,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialogConfig,
} from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HospitalCat } from "../hospitalCat.model";

import { SelectionModel } from "@angular/cdk/collections";
import { Observable } from "rxjs";
import { HospitalCatEditComponent } from "../hospital-cat-edit/hospital-edit-cat.component";
import { PageConfig } from "src/app/config";
import { AppListViewBaseComponent } from "src/app/app-list-view-base.component";

@Component({
  selector: "app-hospital-cat",
  templateUrl: "./hospital-cat.component.html",
  styleUrls: ["./hospital-cat.component.css"],
})
export class HospitalCatComponent extends AppListViewBaseComponent<HospitalCat>
  implements OnInit {
  listhopitalCatValues: any;
  hospitalCat$: Observable<HospitalCat[]>;
  displayedColumns: string[] = ["select", "name", "remark"];

  constructor(
    private store: Store<any>,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    super();
    super.bindMethods("add", "edit", "delete");

    this.store.dispatch(new ActionsFile.Load());
    this.remplir();
  }

  remplir() {
    this.store.subscribe((data) => {
      this.listhopitalCatValues = Object.values(data.HospitalCat.entities);
      console.log(" this.listhopitalCatValues=> ", this.listhopitalCatValues);
      this.fillData(this.listhopitalCatValues);
    });
  }

  ngOnInit() {}

  add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new HospitalCat(),
      title: "Add ",
    };

    this.dialog.open(HospitalCatEditComponent, dialogConfig);
    this.reload();
  }

  reload() {
    this.dialog.afterAllClosed.subscribe((res) => this.remplir());
  }

  edit() {
    console.log("edit");
    var cat = <HospitalCat>this.selection.selected[0];
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      _currentObject: cat,
      title: "Update " + cat.name,
    };
    this.dialog.open(HospitalCatEditComponent, dialogConfig);

    console.log("updated");
    this.reload();
  }

  delete() {
    if (confirm("Are You Sure You want to Delete the User?")) {
      var cat = <HospitalCat>this.selection.selected[0];
      console.log("cat => ", cat);
      this.store.dispatch(new ActionsFile.Delete(cat.id));
      this.remplir();
    }
  }
}
