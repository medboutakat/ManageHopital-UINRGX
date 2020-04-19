import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import * as doctorActions from "../doctor-store/doctor.action";
import * as fromDoctorReducer from "../doctor-store/doctor.reducer";
import { Doctor } from '../doctor.model';
import { DoctorEditComponent } from '../doctor-edit/doctor-edit.component';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteAppointement } from 'src/app/appointements/store/appointement.actions';
import { Invoice } from 'src/app/invoices/invoice-model';
import { DeleteDoctorComponent } from '../delete-doctor/delete-doctor.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctors: Doctor[];
  error$: Observable<String>;
  dataSource: any;
  selection: SelectionModel<Doctor>;

  constructor(private router: Router, private store: Store<fromDoctorReducer.AppSate>, private _bottomSheet: MatBottomSheet, public dialog: MatDialog) { }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['select', 'firstName', 'lastName', 'sexe'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.store.dispatch(new doctorActions.getDoctor());
    this.store.subscribe(data => {
      this.doctors = Object.values(data.doctors.doctors)
      console.log(" listDoctorCat=> ", this.doctors)
      this.dataSource = new MatTableDataSource<Doctor>(this.doctors);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<Doctor>(true, []);
    })
  }

  openBottomSheet(): void {
    this._bottomSheet.open(DoctorEditComponent);
    console.log('show bottom sheet ...')
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row =>
        this.selection.select(row),

      );
  }
  // onrowselect(row) {
  //   console.log("roow", row)
  // }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Doctor): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;

  }
  id: string
  data: any;
  isAvailable = false;
  selected(row) {
    console.log("selected row", row)
    this.isAvailable = true
    this.data = row
    this.id = row.id;
    localStorage.setItem("id", this.id)

  }
  /*****************open dialog to delete doctor ******************************** */
  OpenDelete() {
    this.dialog.open(DeleteDoctorComponent)
  }
  /*************************add Doctor*********************************************** */
  add() {
    this.router.navigate(['/addDoctor'])
  }

}
