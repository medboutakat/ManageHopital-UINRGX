import { ViewChild } from "@angular/core";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { PageConfig } from "./config";
import { Observable } from 'rxjs';

export class AppListViewBaseComponent<T> {
  public pageSize = PageConfig.pageSize;
  public rowSelection;
  public IsRowSelected: boolean = false;
  public IsMultple: boolean = false;
  public isNew: boolean = false;
  dataSource: any;
  apps: any;
  error$: Observable<String>;
  selection: SelectionModel<T>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public displayedColumns: string[];

  constructor() {
    
  }

  bindMethods(...params:string[]){
    params.forEach(x=>{ 
    this[x] = this[x].bind(this); 
    })  
  }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }

  onrowselect() {
    this.IsMultple = this.selection.selected.length > 1;
    this.IsRowSelected = this.selection.selected.length == 1;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  fillData(data) {
    this.dataSource = new MatTableDataSource<T>(data);
    this.reset();
  }
  reset() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.selection = new SelectionModel<T>(true, []);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row["id"] + 1
    }`;
  } 
}
