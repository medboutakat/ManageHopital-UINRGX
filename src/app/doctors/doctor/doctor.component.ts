import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from "@angular/material/bottom-sheet";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as doctorActions from "../doctor-store/doctor.action";
import * as fromDoctorReducer from "../doctor-store/doctor.reducer";
import { Doctor } from "../doctor.model";
import { DoctorEditComponent } from "../doctor-edit/doctor-edit.component";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig,
} from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import { PageConfig } from "src/app/config";
import { AppListViewBaseComponent } from "src/app/app-list-view-base.component";

@Component({
  selector: "app-doctor",
  templateUrl: "./doctor.component.html",
  styleUrls: ["./doctor.component.css"],
})
export class DoctorComponent extends AppListViewBaseComponent<Doctor>
  implements OnInit {
  /*******************************Variables declared************************************************ */
  doctors: Doctor[]; 
  /**************************Methods(app-Menu)**************************************** */

  constructor(
    private router: Router,
    private store: Store<any>,
    public dialog: MatDialog
  ) {
    super();
    this.displayedColumns = ["select", "firstName", "lastName", "sexe"];

    super.bindMethods("add", "edit", "delete");

    this.store.dispatch(new doctorActions.getDoctor());
    this.remplir();
  }

  ngOnInit() {}

  /**************************Load Data******************************** */
  remplir() {
    this.store.subscribe((data) => {
      this.doctors = Object.values(data.doctors.entities);
      console.log(" doctor=> ", this.doctors);
      this.fillData(this.doctors);
    });
  }
  /****************************Delete Doctor************************************ */
  delete() {
    if (confirm("Are You Sure You want to Delete the User?")) {
      var Doctor = <Doctor>this.selection.selected[0];
      this.store.dispatch(new doctorActions.DeleteDoctor(Doctor.id));
      this.remplir();
    }
  }

  /**************************Edit Doctor********************************************** */
  edit() {
    console.log("edit");
    var doctor = <Doctor>this.selection.selected[0];
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: doctor,
      title: "Update " + doctor.firstName,
    };
    this.dialog.open(DoctorEditComponent, dialogConfig);
    console.log("updated");
    this.reload();
  }
  /*********************************Add Doctor********************************************** */
  add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new Doctor(),
      title: "Add ",
    };

    this.dialog.open(DoctorEditComponent, dialogConfig);
    this.reload();
  }
  /**********************Reload ************************************************* */
  reload() {
    this.dialog.afterAllClosed.subscribe((res) => this.remplir());
  }
}
