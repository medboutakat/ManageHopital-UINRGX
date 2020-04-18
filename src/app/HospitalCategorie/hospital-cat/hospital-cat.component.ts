import { Component, OnInit, ViewChild } from '@angular/core';
import { Store ,select} from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { DialogComponent } from 'src/app/appointements/dialog/dialog.component';
import { MatDialog, MatBottomSheetRef, MatBottomSheet, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromHospitalCat from "src/app/HospitalCategorie/Store/reducer";
import { HospitalCat } from '../hospitalCat.model';

import { SelectionModel } from '@angular/cdk/collections';
import { GridApi } from 'ag-grid-community';
import { AddHospitalCatComponent } from 'src/app/HospitalCategorie/add-hospital-cat/add-hospital-cat.component';
import { Observable } from 'rxjs';

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

  displayedColumns: string[] = [ 'select','name', 'remark'];
  constructor(private store : Store<any>,public dialog: MatDialog,private fb: FormBuilder,) {
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
    }
    )

  }
  
  deleteHospitalCat() {
    var RowId = localStorage.getItem("RowId")
    if (confirm("Are You Sure You want to Delete the User?")) {
      this.store.dispatch(new ActionsFile.DeleteHospitalCat(localStorage.getItem("RowId")));
      this.store.dispatch( new ActionsFile.LoadHospitalCat());
      this.remplir()
      
    }
  }
  
  onrowselect(row){
    console.log("roow",row)
    localStorage.setItem("RowId",row.id)
  }

  ngOnInit() { 
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
  this.dialog.afterAllClosed.subscribe(res=> this.remplir())
  
}
}
