import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actionApps from '../store/appointement.actions'
import * as fromReducer from '../store/appointement.reducer'
import { MatDialog, MatSort, MatPaginator, MatTableDataSource, MatDialogConfig } from '@angular/material'
import { SavePdfComponent } from '../save-pdf/save-pdf.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Appointement } from '../appointement.model';
import { PageConfig } from 'src/app/config';
import { AppointemntEditComponent } from 'src/app/appointements/appointemnt-edit/appointemnt-edit.component';
import { Router } from '@angular/router';
import { AppListViewBaseComponent } from 'src/app/app-list-view-base.component';


@Component({
  selector: 'app-appointement',
  templateUrl: './appointement.component.html',
  styleUrls: ['./appointement.component.css']
})
export class AppointementComponent   extends AppListViewBaseComponent<Appointement> implements OnInit {
 


  displayedColumns: string[] = ['select', 'assurance', 'reservationTimeStamp', 'subject'];

  constructor(private store: Store<any>, public dialog: MatDialog,private router: Router) {
    super();
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this); 
  }
  remplir(){
    this.store.subscribe(data => {
      this.apps = Object.values(data.appointements.entities)
      console.log(" apps=> ", this.apps)
      this.fillData(this.apps)  
    })
  }
  ngOnInit() {
    this.store.dispatch(new actionApps.LoadAppointements());
    this.remplir();
  }

  save(data) {
    this.dialog.open(SavePdfComponent, { data });
  }
  


  delete() {
    if (confirm("Are You Sure You want to Delete the User?")) {
      var cat = <Appointement>this.selection.selected[0];
      console.log("cat => ", cat);
      this.store.dispatch(new actionApps.DeleteAppointement(cat.id));
    }
  }


  
  add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new Appointement(),
      title: "Add ",
    };
    this.dialog.open(AppointemntEditComponent, dialogConfig);
  }

  reload() {
    this.dialog.afterAllClosed.subscribe((res) => this.remplir());
  }
  edit() {
    console.log("edit");
    var cat = <Appointement>this.selection.selected[0];
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      _currentObject: cat,
      title: "Update " + cat.identityNo,
    };
    this.dialog.open(AppointemntEditComponent, dialogConfig);
    console.log("updated");
    this.reload();
  }

}
