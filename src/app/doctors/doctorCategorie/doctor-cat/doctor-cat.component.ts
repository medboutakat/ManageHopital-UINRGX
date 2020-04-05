import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ActionsFile from 'src/app/doctors/doctorCategorie/Store/Action'
import { Observable } from 'rxjs';
import { doctorCat } from '../doctorCat.module';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';

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
  constructor(private store : Store<any>) { 
    this.columnDefs = this.createColumnDefs();
    this.delete;  

  }

  ngOnInit() {
    this.store.dispatch( new ActionsFile.LoadDoctorCat());
    this.LoadData();

  }
  LoadData() {
     this.store.subscribe(data =>{
      this.listDoctorCat = Object.values(data.DoctorCat.entities)  
      console.log(" this.listDoctorCat=> ",this.listDoctorCat) 
    }
    );
  }
private createColumnDefs() {
  return [
    { headerName: 'name', field: 'name', editable: true, filter: true, sortable: true, checkboxSelection: true },
    { headerName: 'remark', field: 'remark', editable: true, filter: true, sortable: true },
  ]
}

exist: boolean = false;

// row data and column definitions
private rowData: doctorCat[];
private columnDefs: ColDef[];


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

delete(hospital: doctorCat) {
  if (confirm("Are You Sure You want to Delete the User?")) {
    this.store.dispatch(new ActionsFile.DeleteDoctorCat(hospital.id));
    this.store.dispatch( new ActionsFile.LoadDoctorCat());
  }
}
}