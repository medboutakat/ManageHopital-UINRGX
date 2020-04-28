import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actionApps from '../store/appointement.actions'
import * as fromReducer from '../store/appointement.reducer'
import { MatDialog, MatSort, MatPaginator, MatTableDataSource, MatDialogConfig } from '@angular/material'
import { DialogComponent } from '../dialog/dialog.component';
import { AddAppointementComponent } from '../add-appointement/add-appointement.component';
import { SavePdfComponent } from '../save-pdf/save-pdf.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Appointement } from '../appointement.model';
import { PageConfig } from 'src/app/config';


@Component({
  selector: 'app-appointement',
  templateUrl: './appointement.component.html',
  styleUrls: ['./appointement.component.css']
})
export class AppointementComponent implements OnInit {
  dataSource: any;
  selection: SelectionModel<Appointement>;
  private rowSelection;
  private IsRowSelected: boolean = false;
  private IsMultple: boolean = false;
  private pageSize = PageConfig.pageSize

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['select', 'assurance', 'reservationTimeStamp', 'subject'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private store: Store<any>, public dialog: MatDialog) {
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);

  }
  apps;
  remplir(){
    this.store.subscribe(data => {
      this.apps = Object.values(data.appointements.entities)
      console.log(" apps=> ", this.apps)
      this.dataSource = new MatTableDataSource<Appointement>(this.apps);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<Appointement>(true, []);
    })
  }
  ngOnInit() {
    this.store.dispatch(new actionApps.LoadAppointements());
    this.remplir();
  }
  openDialog(data) {
    this.dialog.open(DialogComponent, { data })
  }
  save(data) {
    this.dialog.open(SavePdfComponent, { data });
  }
  // add() {
  //   console.log("hello");
  //   this.dialog.open(AddAppointementComponent);
  // }


  
  onrowselect() {
    this.IsMultple = this.selection.selected.length > 1;
    this.IsRowSelected = this.selection.selected.length == 1;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Appointement): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.id + 1
    }`;
  }


  delete() {
    // console.log("deleteselection",this.selection.selected);
    // var RowId = localStorage.getItem("RowId")
    if (confirm("Are You Sure You want to Delete the User?")) {
      var cat = <Appointement>this.selection.selected[0];
      console.log("cat => ", cat);
      this.store.dispatch(new actionApps.DeleteAppointement(cat.id));
      // this.remplir()
    }
  }


  
  add() {
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new Appointement(),
      title: "Add ",
    };

    this.dialog.open(AddAppointementComponent, dialogConfig);
  }

  reload() {
    this.dialog.afterAllClosed.subscribe((res) => this.remplir());
  }
  edit() {
    console.log("edit");
    var cat = <Appointement>this.selection.selected[0];
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      _currentObject: cat,
      title: "Update " + cat.id,
    };
    this.dialog.open(AddAppointementComponent, dialogConfig);
    console.log("updated");
    this.reload();
  }
}
