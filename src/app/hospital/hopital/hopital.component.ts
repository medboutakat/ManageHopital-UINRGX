import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { Observable } from 'rxjs';
import { HospitalCat } from 'src/app/HospitalCategorie/hospitalCat.model';
import * as ActionsFiles from 'src/app/hospital/store/Action'
import { MatBottomSheet, MatDialog, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
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
  error$: Observable<String>;
  dataSource: any;
  selection: SelectionModel<Hospital>;
  iscolled : boolean = true

  constructor(private store : Store<any>, private _bottomSheet: MatBottomSheet,public dialog: MatDialog) {
    this.store.dispatch( new ActionsFile.LoadHospitalCat());
    this.store.subscribe(data =>{  
      this.listhopitalCatValues = Object.values(data.HospitalCat.entities)  
      console.log(" this.listhopitalCatValues=> ",this.listhopitalCatValues) 
    
    });

    this.store.dispatch( new ActionsFiles.LoadHospital());
    this.store.subscribe(data =>{  
      this.listHopital = Object.values(data.Hospital.entities)  
      console.log(" this.listhopital=> ",this.listHopital) ,
      this.dataSource = new MatTableDataSource<Hospital>(this.listHopital);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<Hospital>(true, []);
    })
  
  }

  applyFilter(filtervalue : string){
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }
  
    
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [ 'select','countryHealthId', 'name','remark','history'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
   
  }
  get hospitalcat(){
     return this.listhopitalCatValues;
  }

  openBottomSheet(): void {
    this._bottomSheet.open(HospitalEditComponent);
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
  onrowselect(row){
    console.log("roow",row.id)
    localStorage.setItem("rows",row.id)
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Hospital): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    
  }

  isToggele (){
    this.iscolled= !this.iscolled;
  }
  openDialog(data) {
    this.dialog.open(DialogHospComponent, { data })
    
  }
  mnmmm(){
    console.log("rowss",localStorage.getItem("rows"))
    var rows = localStorage.getItem("rows")
  }
}
