import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import * as ActionsFile from "../../HospitalCategorie/Store/Action";
import { Observable } from "rxjs"; 
import * as ActionsFiles from "../../hospitals/store/Action";
import {
 MatBottomSheet,
  MatDialog,
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatDialogConfig,
} from "@angular/material";
import { HospitalEditComponent } from "../hospital-edit/hospital-edit.component";
import { SelectionModel } from "@angular/cdk/collections";
import { Hospital } from "../hospital.model";
import { AppListViewBaseComponent } from 'src/app/app-list-view-base.component';

@Component({
  selector: "app-hopital",
  templateUrl: "./hopital.component.html",
  styleUrls: ["./hopital.component.css"],
})
export class HopitalComponent extends AppListViewBaseComponent<Hospital> implements OnInit {
  hospitals: Hospital[];
  listhopitalCatValues: any;
  listHopital: any; 
  constructor(
    private store: Store<any>,
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog
  ) {
    
    super();

    super.bindMethods("add", "edit", "delete"); 
    this.displayedColumns = [
    "select",
    "countryHealthId",
    "name",
    "remark",
    "history",
   ];
    this.store.dispatch(new ActionsFiles.LoadHospital());
    this.remplir();

    this.store.dispatch(new ActionsFile.Load());
    this.store.subscribe((data) => {
      this.listhopitalCatValues = Object.values(data.HospitalCat.entities);
      console.log(" this.listhopitalCatValues=> ", this.listhopitalCatValues);
    });
  }
  remplir() {
    this.store.subscribe((data) => {
      this.listHopital = Object.values(data.Hospital.entities);
      console.log(" this.listhopital=> ", this.listHopital),
        (this.dataSource = new MatTableDataSource<Hospital>(this.listHopital));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<Hospital>(true, []);
    });
  }
 

  ngOnInit() {}
  get hospitalcat() {
    return this.listhopitalCatValues;
  }

 
 

  delete() {

    if (confirm("Are You Sure You want to Delete the User?")) {
      var cat = <Hospital>this.selection.selected[0];
      console.log("cat => ", cat);
      this.store.dispatch(new ActionsFiles.DeleteHospital(cat.id));
     
    }
  }
  reload() {
    this.dialog.afterAllClosed.subscribe((res) => this.remplir());
  }
  edit() {
    console.log("edit");
    var cat = <Hospital>this.selection.selected[0];
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      _currentObject: cat,
      title: "Update " + cat.name,
    };
    this.dialog.open(HospitalEditComponent, dialogConfig);
    console.log("updated");
    this.reload();
  }

  add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new Hospital(),
      title: "Add ",
    };

    this.dialog.open(HospitalEditComponent, dialogConfig);
  }
}
