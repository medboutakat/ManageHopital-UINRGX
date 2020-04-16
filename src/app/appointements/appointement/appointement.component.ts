import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actionApps from '../store/appointement.actions'
import * as fromReducer from '../store/appointement.reducer'
import { MatDialog, MatSort, MatPaginator, MatTableDataSource } from '@angular/material'
import { DialogComponent } from '../dialog/dialog.component';
import { AddAppointementComponent } from '../add-appointement/add-appointement.component';
import { SavePdfComponent } from '../save-pdf/save-pdf.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Appointement } from '../appointement.model';


@Component({
  selector: 'app-appointement',
  templateUrl: './appointement.component.html',
  styleUrls: ['./appointement.component.css']
})
export class AppointementComponent implements OnInit {
  dataSource: any;
  selection: SelectionModel<Appointement>;



  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['select', 'assurance', 'reservationTimeStamp', 'subject'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private store: Store<any>, public dialog: MatDialog) {

    this.store.dispatch(new actionApps.LoadAppointements());
    this.store.subscribe(data => {
      this.apps = Object.values(data.appointements.appointements)
      console.log(" apps=> ", this.apps)
      this.dataSource = new MatTableDataSource<Appointement>(this.apps);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<Appointement>(true, []);
    })
  }
  apps;
  ngOnInit() {
  }
  openDialog(data) {
    this.dialog.open(DialogComponent, { data })
  }
  save(data) {
    this.dialog.open(SavePdfComponent, { data });
  }
  add() {
    console.log("hello");
    this.dialog.open(AddAppointementComponent);
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
        this.selection.select(row)

      );
  }

  onrowselect(row) {
    console.log("roow", row)
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Appointement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;

  }
}
