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
export class ProductComponent implements OnInit {

  constructor() { }


  ngOnInit() {

  }

}
