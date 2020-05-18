import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ActionsFile from 'src/app/doctorCategorie/Store/Action'
import { Observable } from 'rxjs';
import { doctorCat } from '../doctorCat.module';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections'; 
import { DoctorEditCatComponent } from '../doctor-edit-cat/doctor-edit-cat.component';
import { AppListViewBaseComponent } from 'src/app/app-list-view-base.component';

@Component({
  selector: 'app-doctor-cat',
  templateUrl: './doctor-cat.component.html',
  styleUrls: ['./doctor-cat.component.scss']
})
export class DoctorCatComponent extends AppListViewBaseComponent<doctorCat>  implements OnInit {
  objlist: Observable<doctorCat[]>;
  dataavailbale: Boolean = false; 
  tempemp: doctorCat; 
  listDoctorCat :any;   
  exist: boolean = false;


  constructor(private store: Store<any>, public dialog: MatDialog) {
    super();
    super.bindMethods('add','edit','delete');
  }

  ngOnInit() {
    this.displayedColumns=['select', 'name', 'remark'];

    this.store.dispatch(new ActionsFile.Load());
    this.remplir()

  }
  remplir() {
    this.store.subscribe(data => {
      this.listDoctorCat = Object.values(data.DoctorCat.entities)
      console.log(" listDoctorCat=> ", this.listDoctorCat)
      this.fillData(this.listDoctorCat)      
    })

  }
 


  add() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new doctorCat(),
      title: "Add ",
    }

    this.dialog.open(DoctorEditCatComponent, dialogConfig);
    this.reload();
  }

  reload() {
    this.dialog.afterAllClosed.subscribe(res => this.remplir())
  }

  edit() {
    console.log("edit");
    var cat = <doctorCat>this.selection.selected[0];
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      _currentObject: cat,
      title: "Update " + cat.name
    }
    this.dialog.open(DoctorEditCatComponent, dialogConfig);
    console.log('updated');
    this.reload();
  }

  delete() { 
    if (confirm("Are You Sure You want to Delete the User?")) {
      var cat = <doctorCat>this.selection.selected[0];
      console.log("cat => ", cat);
      this.store.dispatch(new ActionsFile.Delete(cat.id));
      this.remplir()
    } 
  }
}