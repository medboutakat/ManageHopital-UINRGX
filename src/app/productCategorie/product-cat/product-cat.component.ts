import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ActionsFile from 'src/app/ProductCategorie/Store/Action'
import { Observable } from 'rxjs';
import { productCat } from '../productCat.module';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductEditCatComponent } from '../product-edit-cat/product-edit-cat.component';

@Component({
  selector: 'app-product-cat',
  templateUrl: './product-cat.component.html',
  styleUrls: ['./product-cat.component.scss']
})
export class ProductCatComponent implements OnInit {
  objlist: Observable<productCat[]>;
  dataavailbale: Boolean = false;
  action: string;
  tempemp: productCat;
  private rowSelection;
  private IsRowSelected: boolean = false;
  private IsMultple: boolean = false;
  listProductCat :any;
  dataSource : any;
  selection: SelectionModel<productCat>;
  displayedColumns: string[] = ['select', 'name', 'remark'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  exist: boolean = false;


  constructor(private store: Store<any>, public dialog: MatDialog) {

    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  ngOnInit() {
    this.store.dispatch(new ActionsFile.LoadProductCat());
    this.remplir()

  }
  remplir() {
    this.store.subscribe(data => {
      this.listProductCat = Object.values(data.ProductCat.entities)
      console.log(" listProductCat=> ", this.listProductCat)
      this.dataSource = new MatTableDataSource<productCat>(this.listProductCat);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<productCat>(true, []);
    })

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
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: productCat): string {

    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }




  add() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new productCat(),
      title: "Add ",
    }

    this.dialog.open(ProductEditCatComponent, dialogConfig);
    this.reload();
  }

  reload() {
    this.dialog.afterAllClosed.subscribe(res => this.remplir())
  }

  edit() {
    console.log("edit");
    var cat = <productCat>this.selection.selected[0];
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      _currentObject: cat,
      title: "Update " + cat.name
    }
    this.dialog.open(ProductEditCatComponent, dialogConfig);
    console.log('updated');
    this.reload();
  }

  delete() { 
    if (confirm("Are You Sure You want to Delete the User?")) {
      var cat = <productCat>this.selection.selected[0];
      console.log("cat => ", cat);
      this.store.dispatch(new ActionsFile.DeleteProductCat(cat.id));
      this.remplir()
    } 
  }
}