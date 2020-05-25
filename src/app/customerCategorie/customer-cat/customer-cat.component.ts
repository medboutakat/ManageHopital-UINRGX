import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ActionsFile from 'src/app/customerCategorie/Store/Action'
import { Observable } from 'rxjs'; 
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections'; 
import { CustomerEditCatComponent } from '../customer-edit-cat/customer-edit-cat.component';
import { AppListViewBaseComponent } from 'src/app/app-list-view-base.component';
import { CustomerCat } from '../customer-cat.model';

@Component({
  selector: 'app-customer-cat',
  templateUrl: './customer-cat.component.html',
  styleUrls: ['./customer-cat.component.scss']
})
export class CustomerCatComponent extends AppListViewBaseComponent<CustomerCat>  implements OnInit {
  objlist: Observable<CustomerCat[]>;
  dataavailbale: Boolean = false; 
  tempemp: CustomerCat; 
  listCustomerCat :any;   
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
      this.listCustomerCat = Object.values(data.CustomerCat.entities)
      console.log(" listCustomerCat=> ", this.listCustomerCat)
      this.fillData(this.listCustomerCat)      
    })

  }
 


  add() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new CustomerCat(),
      title: "Add ",
    }

    this.dialog.open(CustomerEditCatComponent, dialogConfig);
    this.reload();
  }

  reload() {
    this.dialog.afterAllClosed.subscribe(res => this.remplir())
  }

  edit() {
    console.log("edit");
    var cat = <CustomerCat>this.selection.selected[0];
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      _currentObject: cat,
      title: "Update " + cat.name
    }
    this.dialog.open(CustomerEditCatComponent, dialogConfig);
    console.log('updated');
    this.reload();
  }

  delete() { 
    if (confirm("Are You Sure You want to Delete the User?")) {
      var cat = <CustomerCat>this.selection.selected[0];
      console.log("cat => ", cat);
      this.store.dispatch(new ActionsFile.Delete(cat.id));
      this.remplir()
    } 
  }
}