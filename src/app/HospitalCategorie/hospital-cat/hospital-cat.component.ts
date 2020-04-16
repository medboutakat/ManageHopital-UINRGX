import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { DialogComponent } from 'src/app/appointements/dialog/dialog.component';
import { MatDialog, MatBottomSheetRef, MatBottomSheet, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromHospitalCat from "src/app/HospitalCategorie/Store/reducer";
import { HospitalCat } from '../hospitalCat.model';
import { HospitalCatAddComponent } from '../hospital-cat-add/hospital-cat-add.component';
import { SelectionModel } from '@angular/cdk/collections';
import { GridApi } from 'ag-grid-community';
import { AddHospitalCatComponent } from 'src/app/HospitalCategorie/add-hospital-cat/add-hospital-cat.component';

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
  
  displayedColumns: string[] = [ 'select','name', 'remark'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private store : Store<any>,public dialog: MatDialog,private fb: FormBuilder,) {
    this.store.dispatch( new ActionsFile.LoadHospitalCat());
  
    this.store.subscribe(data =>{  
      this.listhopitalCatValues = Object.values(data.HospitalCat.entities)  
      console.log(" this.listhopitalCatValues=> ",this.listhopitalCatValues) 
    
      this.dataSource = new MatTableDataSource<HospitalCat>(this.listhopitalCatValues);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<HospitalCat>(true, []);
    }
    )
  } 
  
applyFilter(filtervalue : string){
  this.dataSource.filter = filtervalue.trim().toLowerCase();
}

  ngOnInit() {
   
  }
  openDialog(data) {
    this.dialog.open(DialogComponent, { data })
  }

deleteCustomer(hospital: HospitalCat) {
  if (confirm("Are You Sure You want to Delete the User?")) {
    this.store.dispatch(new ActionsFile.DeleteHospitalCat(hospital.id));
    this.store.dispatch( new ActionsFile.LoadHospitalCat());
  }
}

// add() {
//   console.log("hello");
//   this.dialog.open(HospitalCatAddComponent);
// }

isAllSelected() {
  const numSelected = this.selection.selected.length;
  
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
  
}


onrowselect(row){
  console.log("roow",row)
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
  this.dialog.open(AddHospitalCatComponent);
}
}
