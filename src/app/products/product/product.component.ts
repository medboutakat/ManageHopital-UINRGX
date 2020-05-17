import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import * as ActionsFile from "src/app/products/Store/Action";
import { Observable } from "rxjs";
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
import { Product } from "../product.Module";
import { AppListViewBaseComponent } from "src/app/app-list-view-base.component";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent extends AppListViewBaseComponent<Product>
  implements OnInit {
  products: Product[];
  productValues: any;
  listProducts: any; 

  constructor(
    private store: Store<any>,
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog
  ) {
    super();

    super.bindMethods("add", "edit", "delete");
  }

  remplir() {
    this.store.subscribe((data) => {
      this.listProducts = Object.values(data.products.entities);
      console.log(" Products list : ", this.listProducts);
      this.fillData(this.listProducts);
    });
  }

  displayedColumns: string[] = [
    "select",
    "name",
    "quantityPerUnit",
    "unitPrice",
    "unitsInStock",
    "unitsOnOrder",
    "reorderLevel",
    "discontinued",
  ];

  ngOnInit() {
    //this.remplir();
    this.store.dispatch(new ActionsFile.Load());
    this.remplir();
  }
  get product() {
    return this.productValues;
  }

  delete() {
    if (confirm("Are You Sure You want to Delete the User?")) {
      var cat = <Product>this.selection.selected[0];
      console.log("cat => ", cat);
      this.store.dispatch(new ActionsFile.Delete(cat.id));
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
    this.dialog
      .open(ProductEditComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
        this.store.dispatch(new ActionsFile.Load());
        this.remplir();
      });
    console.log("updated");
  }

  add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new Product(),
      title: "Add ",
    };

    this.dialog
      .open(ProductEditComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
        this.store.dispatch(new ActionsFile.Load());
        this.remplir();
      });
  }
}
