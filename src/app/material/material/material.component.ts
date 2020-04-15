import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import * as ActionsFile from "src/app/material/Store/Action"; 
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: "app-material",
  templateUrl: "./material.component.html",
  styleUrls: ["./material.component.scss"],
})
export class MaterialComponent implements OnInit {
  materials: any;
  
  displayedColumns: string[] = ['id', 'name', 'remark', 'quantity'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private store: Store<any>, private fb: FormBuilder) {
    this.store.dispatch(new ActionsFile.LoadMaterial());
    this.store.subscribe((data) => {
      this.materials = Object.values(data.Materials.entities); 
      this.dataSource = new MatTableDataSource<PeriodicElement>( this.materials);     
      console.log(" this.materials=> ",  this.materials );
    });
  }

  
  ngOnInit(){
    this.dataSource.paginator = this.paginator;
  }

}


export interface PeriodicElement {
  id: string;
  name: number;
  remark: number;
  quantity: string;
} 