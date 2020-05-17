import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import * as ActionsFile from "src/app/material/Store/Action"; 
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AppListViewBaseComponent } from 'src/app/app-list-view-base.component';
import { Material } from '../material-model';

@Component({
  selector: "app-material",
  templateUrl: "./material.component.html",
  styleUrls: ["./material.component.scss"],
})
export class MaterialComponent extends AppListViewBaseComponent<Material>  implements OnInit {
  materials: any; 
  displayedColumns: string[] = ['id', 'name', 'remark', 'quantity']; 


  constructor(private store: Store<any>, private fb: FormBuilder) {
    super();

    this.store.dispatch(new ActionsFile.LoadMaterial());
    this.store.subscribe((data) => {
      this.materials = Object.values(data.Materials.entities); 
      this.dataSource = new MatTableDataSource<Material>( this.materials);     
      console.log(" this.materials=> ",  this.materials );
    });
  }

  
  ngOnInit(){
    this.dataSource.paginator = this.paginator;
  }

}


 