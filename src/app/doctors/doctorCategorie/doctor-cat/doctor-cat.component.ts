import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ActionsFile from 'src/app/doctors/doctorCategorie/Store/Action'
import { Observable } from 'rxjs';
import { doctorCat } from '../doctorCat.module';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { selectAll,selectOne } from 'src/app/doctors/doctorCategorie/doctorCat.selector';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { PeriodicElement } from 'src/app/modules/dashboard/dashboard.component';
import { SelectionModel } from '@angular/cdk/collections';


// export interface listDoctorCat {
//   name: string;
  
//   remark: string;

// }

// const ELEMENT_DATA: listDoctorCat[] = [
//   {name: '', remark: ''},

// ];

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
  


  listDoctorCat
  dataSource;
  selection: SelectionModel<doctorCat>;
  constructor(private store : Store<any>) { 
    // this.columnDefs = this.createColumnDefs();
       this.delete=this.delete.bind(this);  
 

  }
  displayedColumns: string[] = [ 'select','name', 'remark'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.store.dispatch( new ActionsFile.LoadDoctorCat());
    this.store.subscribe(data =>{
      this.listDoctorCat = Object.values(data.DoctorCat.entities)  
      console.log(" listDoctorCat=> ",this.listDoctorCat) 
  this.dataSource = new MatTableDataSource<doctorCat>(this.listDoctorCat);
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
  this.selection = new SelectionModel<doctorCat>(true, []);
    })

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
    console.log("roow",row)
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

// gridApi and columnApi
private api: GridApi;
private columnApi: ColumnApi;

private rowSelection;
private IsRowSelected: boolean;
private IsMultple: boolean;

private SelectedClient: doctorCat=new doctorCat();

onGridReady(params): void {
  this.api = params.api;
  this.columnApi = params.columnApi;

  this.api.sizeColumnsToFit();
  console.log('params', params);
}

onSelectionChanged(event) { 
  var selectedRowLenght=this.api.getSelectedRows().length;
  if (selectedRowLenght == 0) { 
    this.IsMultple = false;
    this.IsRowSelected = false;
  }else 
  if(selectedRowLenght == 1)
  { 
    this.IsRowSelected = true;
    this.IsMultple = false;
  }
   else {
    this.IsRowSelected = true;
    this.IsMultple = true;
  }
  console.log(event);

  this.SelectedClient= this.IsRowSelected? this.api.getSelectedRows()[0]:new doctorCat();

  console.log("Selected row :",this.SelectedClient)
}

deletee(doctorcat: doctorCat) {
  if (confirm("Are You Sure You want to Delete the User?")) {
    this.store.dispatch(new ActionsFile.DeleteDoctorCat(doctorcat.id));
    this.store.dispatch( new ActionsFile.LoadDoctorCat());
  }
}

delete() {  
  this.store.select(selectOne,{id:this.SelectedClient.id}).subscribe(res=>{
      console.log("selected res", res);
      this.store.dispatch(new ActionsFile.DeleteDoctorCat(res.objlist.id));
      this.store.dispatch( new ActionsFile.LoadDoctorCat());        
  })  
}
}