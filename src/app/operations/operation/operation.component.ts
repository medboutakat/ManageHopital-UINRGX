import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { AddOperationComponent } from '../edit-operation/add-operation.component';
import { Store } from '@ngrx/store';
import * as opp from '../store/operation.actions'
import { Router } from '@angular/router';
import { PageConfig } from 'src/app/config';
import { Operation } from '../operation';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { AppListViewBaseComponent } from 'src/app/app-list-view-base.component';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent extends AppListViewBaseComponent<Operation> implements OnInit {



  constructor(private router: Router, private store: Store<any>, public dialog: MatDialog) { 
    super();
    super.bindMethods('add','edit','delete');

    this.displayedColumns=['select', 'date', 'price', 'totalStayNight', 'operationCategoryId'];
    this.store.dispatch(new opp.LoadOperations());
    this.remplir()
  }

  ngOnInit() {

  }
 
 
  operations: Operation[];

  
  /**************************Methods(app-Menu)**************************************** */
  /**************************Load Data******************************** */
  remplir() {
    this.store.subscribe(data => {
      this.operations = Object.values(data.operations.entities)
      console.log(" opeartions=> ", this.operations)
      this.fillData(this.operations);
    })
  }
  /****************************Delete Operation************************************ */
  delete() {
    if (confirm("Are You Sure You want to Delete the User?")) {
      var Operation = <Operation>this.selection.selected[0];
      this.store.dispatch(new opp.DeleteOperation(Operation.id));
      this.remplir()
    }
  }

  /**************************Edit Operation********************************************** */
  edit() {
    console.log("edit");
    var operation = <Operation>this.selection.selected[0];
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: operation,
      title: "Update " + operation.date
    }
    this.dialog.open(AddOperationComponent, dialogConfig);
    console.log('updated');
    this.reload();
  }
  /*********************************Add Operation**************************************************** */
  add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new Operation(),
      title: "Add ",
    }

    this.dialog.open(AddOperationComponent, dialogConfig);
    this.reload();
  }
  /**********************Reload ************************************************* */
  reload() {
    this.dialog.afterAllClosed.subscribe(res => this.remplir())
  } 

}


