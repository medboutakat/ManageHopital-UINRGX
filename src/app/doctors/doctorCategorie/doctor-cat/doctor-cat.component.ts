import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ActionsFile from 'src/app/doctors/doctorCategorie/Store/Action'
import { Observable } from 'rxjs';
import { doctorCat } from '../doctorCat.module';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { selectAll,selectOne } from 'src/app/doctors/doctorCategorie/doctorCat.selector';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { PeriodicElement } from 'src/app/modules/dashboard/dashboard.component';
import { SelectionModel } from '@angular/cdk/collections';
import { DoctorEditCatComponent } from '../doctor-edit-cat/doctor-edit-cat.component';

@Component({
  selector: 'app-doctor-cat',
  templateUrl: './doctor-cat.component.html',
  styleUrls: ['./doctor-cat.component.scss']
})
export class DoctorCatComponent implements OnInit {
  objlist: Observable<doctorCat[]>;
  dataavailbale: Boolean = false;
  action: string;
  tempemp: doctorCat;
  private rowSelection;
  private IsRowSelected: boolean=false;
  private IsMultple: boolean=false;



  listDoctorCat
  dataSource;
  selection: SelectionModel<doctorCat>;
  displayedColumns: string[] = [ 'select','name', 'remark'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private store : Store<any>,public dialog: MatDialog) { 
   
    this.add=this.add.bind(this);
    this.edit=this.edit.bind(this);
    this.delete=this.delete.bind(this);  
    this.store.dispatch( new ActionsFile.LoadDoctorCat());
    this.remplir()

  }
 
  ngOnInit() {

  }
  remplir(){
    this.store.subscribe(data =>{
      this.listDoctorCat = Object.values(data.DoctorCat.entities)  
      console.log(" listDoctorCat=> ",this.listDoctorCat) 
      this.dataSource = new MatTableDataSource<doctorCat>(this.listDoctorCat);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<doctorCat>(true, []);
    })

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
checkboxLabel(row?: doctorCat): string {

if (!row) {
  return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
}
return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
}


  applyFilter(filtervalue : string){
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;

exist: boolean = false;











add() {
  
  // dialogConfig.disableClose = true;
  // dialogConfig.autoFocus = true;

  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = { 
    _currentObject: new doctorCat(),
    title:"Add ",
  }

  this.dialog.open(DoctorEditCatComponent,dialogConfig);   
  this.reload();
} 

reload(){
  this.dialog.afterAllClosed.subscribe(res=> this.remplir())  
}

edit() {
  console.log("edit");
  var cat=<doctorCat>this.selection.selected[0];
  const dialogConfig = new MatDialogConfig(); 

  dialogConfig.data = {
    _currentObject: cat,
    title:"Update "+cat.name
  }
  this.dialog.open(DoctorEditCatComponent,dialogConfig);

  console.log('updated');
  this.reload();
} 


delete() {

  // console.log("deleteselection",this.selection.selected);
  // var RowId = localStorage.getItem("RowId")
  if (confirm("Are You Sure You want to Delete the User?")) { 
    var cat=<doctorCat>this.selection.selected[0];
    console.log("cat => ",cat);
    this.store.dispatch(new ActionsFile.DeleteDoctorCat(cat.id)); 
    this.remplir() 
  }
}
}