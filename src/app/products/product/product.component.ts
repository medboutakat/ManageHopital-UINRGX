import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import * as ActionsFile from "src/app/ProductCategorie/Store/Action";
import { Observable } from "rxjs"; 
import * as ActionsFiles from "src/app/products/store/Action";
import {
 MatBottomSheet,
  MatDialog,
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatDialogConfig,
} from "@angular/material";
import { ProductEditComponent } from "../product-edit/product-edit.component";
import { SelectionModel } from "@angular/cdk/collections"; 
import { Product } from '../product.Module';

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  hospitals: Product[];
  listhopitalCatValues: any;
  listHopital: any;
  private rowSelection;
  private IsRowSelected: boolean = false;
  private IsMultple: boolean = false;
  error$: Observable<String>;
  dataSource: any;
  selection: SelectionModel<Product>;

  constructor(
    private store: Store<any>,
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog
  ) {
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);

    this.store.dispatch(new ActionsFiles.Load());
    this.remplir();

    this.store.dispatch(new ActionsFile.LoadProductCat());
    this.store.subscribe((data) => {
      this.listhopitalCatValues = Object.values(data.HospitalCat.entities);
      console.log(" this.listhopitalCatValues=> ", this.listhopitalCatValues);
    });
  }
  remplir() {
    this.store.subscribe((data) => {
      this.listHopital = Object.values(data.Product.entities);
      console.log(" this.listhopital=> ", this.listHopital),
        (this.dataSource = new MatTableDataSource<Product>(this.listHopital));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<Product>(true, []);
    });
  }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort; 

  displayedColumns: string[] = [
    "select",
    "name", 
    "quantityPerUnit",
    "unitPrice",
    "unitsInStock",
    "unitsOnOrder",
    "reorderLevel",
    "discontinued"
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {}
  get hospitalcat() {
    return this.listhopitalCatValues;
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

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.id + 1
    }`;
  }

  delete() {

    if (confirm("Are You Sure You want to Delete the User?")) {
      var cat = <Product>this.selection.selected[0];
      console.log("cat => ", cat);
      this.store.dispatch(new ActionsFiles.Delete(cat.id));
     
    }
  }
  reload() {
    this.dialog.afterAllClosed.subscribe((res) => this.remplir());
  }
  edit() {
    console.log("edit");
    var cat = <Product>this.selection.selected[0];
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      _currentObject: cat,
      title: "Update " + cat.name,
    };
    this.dialog.open(ProductEditComponent, dialogConfig);
    console.log("updated");
    this.reload();
  }

  add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new Product(),
      title: "Add ",
    };

    this.dialog.open(ProductEditComponent, dialogConfig);
  }
}