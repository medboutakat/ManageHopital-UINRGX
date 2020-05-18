import { Component, OnInit, ViewChild } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as ActionsFile from "src/app/ProductCategorie/Store/Action";
import { Observable } from "rxjs";
import { productCat } from "../productCat.module";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig,
} from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { ProductEditCatComponent } from "../product-edit-cat/product-edit-cat.component";
import { AppListViewBaseComponent } from "src/app/app-list-view-base.component";

@Component({
  selector: "app-product-cat",
  templateUrl: "./product-cat.component.html",
  styleUrls: ["./product-cat.component.scss"],
})
export class ProductCatComponent extends AppListViewBaseComponent<productCat>
  implements OnInit {
  objlist: Observable<productCat[]>;
  dataavailbale: Boolean = false;
  tempemp: productCat;
  listProductCat: any; 
  showSpinner: boolean = true; 
 
  
 
  exist: boolean = false;

  constructor(private store: Store<any>, public dialog: MatDialog) {
    super(); 
    super.bindMethods("add", "edit", "delete");
  }

  ngOnInit() {
    this.displayedColumns=["select", "name", "remark"];
    this.store.dispatch(new ActionsFile.Load());
    this.remplir();
  }
  remplir() {
    this.showSpinner = true;
    this.store.subscribe((data) => {
      this.listProductCat = Object.values(data.ProductCat.entities);
      console.log(" listProductCat=> ", this.listProductCat);
      this.dataSource = new MatTableDataSource<productCat>(this.listProductCat);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<productCat>(true, []);
      this.showSpinner = false;
    });
  }
 

  add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new productCat(),
      title: "Add ",
    };

    this.dialog.open(ProductEditCatComponent, dialogConfig);
    this.reload();
  }

  reload() {
    this.dialog.afterAllClosed.subscribe((res) => this.remplir());
  }

  edit() {
    console.log("edit");
    var cat = <productCat>this.selection.selected[0];
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      _currentObject: cat,
      title: "Update " + cat.name,
    };
    this.dialog.open(ProductEditCatComponent, dialogConfig);
    console.log("updated");
    this.reload();
  }

  delete() {
    if (confirm("Are You Sure You want to Delete the User?")) {
      var cat = <productCat>this.selection.selected[0];
      console.log("cat => ", cat);
      this.store.dispatch(new ActionsFile.Delete(cat.id));
      this.remplir();
    }
  }
}
