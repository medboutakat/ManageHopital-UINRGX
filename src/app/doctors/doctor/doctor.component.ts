import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as doctorActions from "../doctor-store/doctor.action";
import * as fromDoctorReducer from "../doctor-store/doctor.reducer";
import { Doctor } from '../doctor.model';
import { DoctorEditComponent } from '../doctor-edit/doctor-edit.component';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
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


  constructor(private router: Router, private store: Store<fromDoctorReducer.AppSate>, public dialog: MatDialog) {
    this.store.dispatch(new doctorActions.getDoctor());
    this.remplir();
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  ngOnInit() {
  }

  /*****************************Display Colmun***************************************** */
  displayedColumns: string[] = ['select', 'firstName', 'lastName', 'sexe'];
  /*******************************Variables declared************************************************ */
  private rowSelection;
  private IsRowSelected: boolean = false;
  private IsMultple: boolean = false;
  doctors: Doctor[];
  error$: Observable<String>;
  dataSource: any;
  selection: SelectionModel<Doctor>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  /***************************Apply filtre *************************************************** */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /**************************Methods(app-Menu)**************************************** */
  /**************************Load Data******************************** */
  remplir() {
    this.store.subscribe(data => {
      this.doctors = data.doctors.doctors
      console.log(" doctors=> ", this.doctors)
      this.dataSource = new MatTableDataSource<Doctor>(this.doctors);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<Doctor>(true, []);
    })
  }
  /****************************Delete Doctor************************************ */
  delete() {
    if (confirm("Are You Sure You want to Delete the User?")) {
      var Doctor = <Doctor>this.selection.selected[0];
      var id = Doctor.id
      this.store.dispatch(new doctorActions.DeleteDoctor(id));
      this.remplir()
    }
  }
  /**************************Edit Doctor********************************************** */
  edit() {
    console.log("edit");
    var doctor = <Doctor>this.selection.selected[0];
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: doctor,
      title: "Update " + doctor.firstName
    }
    this.dialog.open(DoctorEditComponent, dialogConfig);
    console.log('updated');
    this.reload();
  }
  /*********************************Add Doctor**************************************************** */
  add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new Doctor(),
      title: "Add ",
    }

    this.dialog.open(DoctorEditComponent, dialogConfig);
    this.reload();
  }
  /**********************Reload ************************************************* */
  reload() {
    this.dialog.afterAllClosed.subscribe(res => this.remplir())
  }

  /*****************************Select Methods**************************************************** */
  onrowselect() {
    this.IsMultple = this.selection.selected.length > 1;
    this.IsRowSelected = this.selection.selected.length == 1;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Doctor): string {

    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


}
