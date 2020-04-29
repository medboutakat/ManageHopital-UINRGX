import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { AddOperationComponent } from '../add-operation/add-operation.component';
import { Store } from '@ngrx/store';
import * as opp from '../store/operation.actions'
import { DeleteOperationComponent } from '../delete-operation/delete-operation.component';
import { Router } from '@angular/router';
import { PageConfig } from 'src/app/config';
import { Operation } from '../operation';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {



  constructor(private router: Router, private store: Store<any>, public dialog: MatDialog) {
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.store.dispatch(new opp.LoadOperations());
    this.remplir()
  }

  ngOnInit() {
  }


  /*****************************Display Colmun***************************************** */
  displayedColumns: string[] = ['select', 'date', 'price', 'totalStayNight', 'operationCategoryId'];
  /*******************************Variables declared************************************************ */
  private pageSize = PageConfig.pageSize;
  private rowSelection;
  private IsRowSelected: boolean = false;
  private IsMultple: boolean = false;
  operations: Operation[];
  error$: Observable<String>;
  dataSource: any;
  selection: SelectionModel<Operation>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  /***************************Apply filtre *************************************************** */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /**************************Methods(app-Menu)**************************************** */
  /**************************Load Data******************************** */
  remplir() {
    this.store.subscribe(data => {
      this.operations = Object.values(data.operations.entities)
      console.log(" opeartions=> ", this.operations)
      this.dataSource = new MatTableDataSource<Operation>(this.operations);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<Operation>(true, []);
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

  /*****************************Select Methods**************************************************** */
  onrowselect() {
    this.IsMultple = this.selection.selected.length > 1;
    this.IsRowSelected = this.selection.selected.length == 1;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Operation): string {

    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


}


