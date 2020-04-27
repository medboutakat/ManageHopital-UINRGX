import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { Observable } from 'rxjs';
import { HospitalCat } from 'src/app/HospitalCategorie/hospitalCat.model';
import * as ActionsFiles from 'src/app/hospital/store/Action'
import { MatBottomSheet, MatDialog, MatSort, MatPaginator, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { HospitalEditComponent } from '../hospital-edit/hospital-edit.component';
import { DialogComponent } from 'src/app/appointements/dialog/dialog.component';
import { DialogHospComponent } from '../dialog-hosp/dialog-hosp.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Hospital } from '../hospital.model';

@Component({
  selector: 'app-hopital',
  templateUrl: './hopital.component.html',
  styleUrls: ['./hopital.component.css']
})
export class HopitalComponent implements OnInit {
  hospitals: Hospital[];
  listhopitalCatValues: any;
  listHopital: any;
  private rowSelection;
  private IsRowSelected: boolean=false;
  private IsMultple: boolean=false;
  error$: Observable<String>;
  dataSource: any;
  selection: SelectionModel<Hospital>;

  constructor(private store: Store<any>, private _bottomSheet: MatBottomSheet, public dialog: MatDialog) {
    this.delete=this.delete.bind(this);  
    this.add=this.add.bind(this);
    this.edit = this.edit.bind(this);

    this.store.dispatch(new ActionsFiles.LoadHospital());
    this.remplir()

    this.store.dispatch(new ActionsFile.LoadHospitalCat());
    this.store.subscribe(data => {
      this.listhopitalCatValues = Object.values(data.HospitalCat.entities)
      console.log(" this.listhopitalCatValues=> ", this.listhopitalCatValues)

    });
  

  }
  remplir() {
    this.store.subscribe(data => {
      this.listHopital = Object.values(data.Hospital.hospitals)
      console.log(" this.listhopital=> ", this.listHopital),
        this.dataSource = new MatTableDataSource<Hospital>(this.listHopital);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<Hospital>(true, []);
    })
  }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }


  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['select', 'countryHealthId', 'name', 'remark', 'history'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {

  }
  get hospitalcat() {
    return this.listhopitalCatValues;
  }

  openBottomSheet(): void {
    this._bottomSheet.open(HospitalEditComponent);
    console.log('show bottom sheet ...')
  }



  onrowselect(){
    this.IsMultple= this.selection.selected.length>1;
    this.IsRowSelected= this.selection.selected.length==1;
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
checkboxLabel(row?: Hospital): string {

if (!row) {
  return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
}
return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
}




delete() {

  // console.log("deleteselection",this.selection.selected);
  // var RowId = localStorage.getItem("RowId")
  if (confirm("Are You Sure You want to Delete the User?")) { 
    var cat=<Hospital>this.selection.selected[0];
    console.log("cat => ",cat);
    this.store.dispatch(new ActionsFiles.DeleteHospital(cat.id)); 
    // this.remplir() 
  }
}
reload() {
  this.dialog.afterAllClosed.subscribe(res => this.remplir())
}
edit() {
  console.log("edit");
  var cat = <Hospital>this.selection.selected[0];
  const dialogConfig = new MatDialogConfig();

  dialogConfig.data = {
    _currentObject: cat,
    title: "Update " + cat.name
  }
  this.dialog.open(HospitalEditComponent, dialogConfig);
  console.log('updated');
  this.reload();
}


add() {
  
  // dialogConfig.disableClose = true;
  // dialogConfig.autoFocus = true;

  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = { 
    _currentObject: new Hospital(),
    title:"Add ",
  }

  this.dialog.open(HospitalEditComponent,dialogConfig);   
  
} 
}
