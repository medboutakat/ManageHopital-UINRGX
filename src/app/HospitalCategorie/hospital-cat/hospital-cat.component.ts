import { Component, OnInit, ViewChild } from '@angular/core';
import { Store ,select} from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action' 
import { MatDialog, MatBottomSheetRef, MatBottomSheet, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
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
  hospitalCat$ : Observable<HospitalCat[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  applyFilter(filtervalue : string){
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }

  
  private rowSelection;
  private IsRowSelected: boolean;
  private IsMultple: boolean;
  action: string;

  displayedColumns: string[] = [ 'select','name', 'remark'];
  constructor(private store : Store<any>,public dialog: MatDialog,private fb: FormBuilder,) {
    this.add=this.add.bind(this);
    this.edit=this.edit.bind(this);
    this.delete=this.delete.bind(this);  

    console.log('bind action')

    this.remplir()
    // this.hospitalCat$ = this.store.pipe(select(fromHospitalCat.getHospitalCats));
  
  }

  remplir(){
    this.store.dispatch( new ActionsFile.LoadHospitalCat()); 
    this.store.subscribe(data =>{  
      this.listhopitalCatValues = Object.values(data.HospitalCat.entities)  
      console.log(" this.listhopitalCatValues=> ",this.listhopitalCatValues)  
      this.dataSource = new MatTableDataSource<HospitalCat>(this.listhopitalCatValues);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<HospitalCat>(true, []);
    })
  }
  

  
  onrowselect(row){
    console.log("onrowselect=> ",row) 
  }

  ngOnInit() { 
    
  this.IsRowSelected=true;
  }



// add() {
//   console.log("hello");
//   this.dialog.open(HospitalCatAddComponent);
// }

isAllSelected() {
  const numSelected = this.selection.selected.length;  
  const numRows = this.dataSource.data.length;
 
  this.IsRowSelected = numSelected==1;
  this.IsMultple = numSelected>1;
  return numSelected === numRows;
}


/** The label for the checkbox on the passed row */
checkboxLabel(row?: HospitalCat): string {
 
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  
}

add() {
  console.log("hello");
  this.dialog.open(HospitalCatEditComponent);
  this.dialog.afterAllClosed.subscribe(res=> this.remplir())  
} 


edit() {
  console.log("edit");
  var cat=<HospitalCat>this.selection.selected[0];
  console.log("cat => ",cat);
  
  this.dialog.open(HospitalCatEditComponent);
  this.dialog.afterAllClosed.subscribe(res=> this.remplir())  
} 

delete() {

  // console.log("deleteselection",this.selection.selected);
  // var RowId = localStorage.getItem("RowId")
  if (confirm("Are You Sure You want to Delete the User?")) { 
    var cat=<HospitalCat>this.selection.selected[0];
    console.log("cat => ",cat);
    this.store.dispatch(new ActionsFile.DeleteHospitalCat(cat.id));
    this.store.dispatch( new ActionsFile.LoadHospitalCat());
    this.remplir()      
  }
}


}
