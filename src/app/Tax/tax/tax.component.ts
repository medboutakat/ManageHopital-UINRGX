import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ActionsFile from 'src/app/Tax/Store/Action'
import { Observable } from 'rxjs';
import { Tax } from '../tax.Module';
import { MatDialog, MatDialogConfig } from '@angular/material'; 
import { AppListViewBaseComponent } from 'src/app/app-list-view-base.component';
import { TaxEditComponent } from '../tax-edit/tax-edit.component';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent extends AppListViewBaseComponent<Tax>  implements OnInit {
  objlist: Observable<Tax[]>;
  dataavailbale: Boolean = false; 
  tempemp: Tax; 
  listTax :any;   
  exist: boolean = false;


  constructor(private store: Store<any>, public dialog: MatDialog) {
    super();
    super.bindMethods('add','edit','delete');
  }

  ngOnInit() {
    this.displayedColumns=['select', 'name', 'value'];

    this.store.dispatch(new ActionsFile.Load());
    this.remplir()

  }
  remplir() {
    this.store.subscribe(data => {
      this.listTax = Object.values(data.Tax.entities)
      console.log(" listTax=> ", this.listTax)
      this.fillData(this.listTax)      
    })

  }
 


  add() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new Tax(),
      title: "Add ",
    }

    this.dialog.open(TaxEditComponent, dialogConfig);
    this.reload();
  }

  reload() {
    this.dialog.afterAllClosed.subscribe(res => this.remplir())
  }

  edit() {
    console.log("edit");
    var cat = <Tax>this.selection.selected[0];
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      _currentObject: cat,
      title: "Update " + cat.name
    }
    this.dialog.open(TaxEditComponent, dialogConfig);
    console.log('updated');
    this.reload();
  }

  delete() { 
    if (confirm("Are You Sure You want to Delete the User?")) {
      var cat = <Tax>this.selection.selected[0];
      console.log("cat => ", cat);
      this.store.dispatch(new ActionsFile.Delete(cat.id));
      this.remplir()
    } 
  }
}