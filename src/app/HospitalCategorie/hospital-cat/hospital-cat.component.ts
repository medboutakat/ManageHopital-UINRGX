import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { MatDialog, MatBottomSheetRef, MatBottomSheet, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalCat } from '../hospitalCat.model';

import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { HospitalCatEditComponent } from '../hospital-cat-edit/hospital-edit-cat.component';

@Component({
  selector: 'app-hospital-cat',
  templateUrl: './hospital-cat.component.html',
  styleUrls: ['./hospital-cat.component.css']
})
export class HospitalCatComponent implements OnInit {
  listhopitalCatValues: any;
  HospitalCatForm: FormGroup;
  dataSource;
  selection: SelectionModel<HospitalCat>;
  hospitalCat$: Observable<HospitalCat[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }


  private rowSelection;
  private IsRowSelected: boolean = false;
  private IsMultple: boolean = false;
  action: string;

  displayedColumns: string[] = ['select', 'name', 'remark'];
  constructor(private store: Store<any>, public dialog: MatDialog, private fb: FormBuilder, ) {
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);

    console.log('bind action')
    this.store.dispatch(new ActionsFile.LoadHospitalCat());
    this.remplir()
    // this.hospitalCat$ = this.store.pipe(select(fromHospitalCat.getHospitalCats));

  }

  remplir() {
    this.store.subscribe(data => {
      this.listhopitalCatValues = Object.values(data.HospitalCat.entities)
      console.log(" this.listhopitalCatValues=> ", this.listhopitalCatValues)
      this.dataSource = new MatTableDataSource<HospitalCat>(this.listhopitalCatValues);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<HospitalCat>(true, []);
    })
  }




  ngOnInit() {
  }



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
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: HospitalCat): string {

    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }






  add() {

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new HospitalCat(),
      title: "Add ",
    }

    this.dialog.open(HospitalCatEditComponent, dialogConfig);
    this.reload();

  }

  reload() {
    this.dialog.afterAllClosed.subscribe(res => this.remplir())
  }

  edit() {
    console.log("edit");
    var cat = <HospitalCat>this.selection.selected[0];
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      _currentObject: cat,
      title: "Update " + cat.name
    }
    this.dialog.open(HospitalCatEditComponent, dialogConfig);

    console.log('updated');
    this.reload();
  }

  delete() {

    // console.log("deleteselection",this.selection.selected);
    // var RowId = localStorage.getItem("RowId")
    if (confirm("Are You Sure You want to Delete the User?")) {
      var cat = <HospitalCat>this.selection.selected[0];
      console.log("cat => ", cat);
      this.store.dispatch(new ActionsFile.DeleteHospitalCat(cat.id));
      this.remplir()
    }
  }


}
