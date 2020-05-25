import { Component, OnInit, ViewChild } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as ActionsFile from "src/app/CustomerCategorie/Store/Action";
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
import { CustomerCat } from "../customer-cat.model";
 
import { Observable } from "rxjs";  
import { AppListViewBaseComponent } from "src/app/app-list-view-base.component";
import { CatEditComponent } from '../customer-cat-edit/edit-cat.component';

@Component({
  selector: "app-CustomerCat-cat",
  templateUrl: "./cat.component.html",
  styleUrls: ["./cat.component.css"],
})
export class CatComponent extends AppListViewBaseComponent<CustomerCat>
  implements OnInit {
  listhopitalCatValues: any;
  CustomerCatCat$: Observable<CustomerCat[]>;
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
      this.listhopitalCatValues = Object.values(data.CustomerCatCat.entities);
      console.log(" this.listhopitalCatValues=> ", this.listhopitalCatValues);
      this.fillData(this.listhopitalCatValues);
    });
  }

  ngOnInit() {}

  add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new CustomerCat(),
      title: "Add ",
    };

    this.dialog.open(CatEditComponent, dialogConfig);
    this.reload();
  }

  reload() {
    this.dialog.afterAllClosed.subscribe((res) => this.remplir());
  }

  edit() {
    console.log("edit");
    var cat = <CustomerCat>this.selection.selected[0];
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      _currentObject: cat,
      title: "Update " + cat.name,
    };
    this.dialog.open(CatEditComponent, dialogConfig);

    console.log("updated");
    this.reload();
  }

  delete() {
    if (confirm("Are You Sure You want to Delete the User?")) {
      var cat = <CustomerCat>this.selection.selected[0];
      console.log("cat => ", cat);
      this.store.dispatch(new ActionsFile.Delete(cat.id));
      this.remplir();
    }
  }
}
