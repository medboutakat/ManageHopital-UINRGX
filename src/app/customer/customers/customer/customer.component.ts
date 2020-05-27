import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from "@angular/material/bottom-sheet";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as customerActions from "../customer-store/action";
import * as fromCustomerReducer from "../customer-store/reducer";
import { Customer } from "../customer.model";
import { CustomerEditComponent } from "../customer-edit/customer-edit.component";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig,
} from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import { PageConfig } from "src/app/config";
import { AppListViewBaseComponent } from "src/app/app-list-view-base.component";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"],
})
export class CustomerComponent extends AppListViewBaseComponent<Customer>
  implements OnInit {
  /*******************************Variables declared************************************************ */
  customers: Customer[]; 
  /**************************Methods(app-Menu)**************************************** */

  constructor(
    private router: Router,
    private store: Store<any>,
    public dialog: MatDialog
  ) {
    super();
    this.displayedColumns = ["select", "firstName", "lastName", "sexe"];

    super.bindMethods("add", "edit", "delete");

    this.store.dispatch(new customerActions.Load());
    this.remplir();
  }

  ngOnInit() {}

  /**************************Load Data******************************** */
  remplir() {
    this.store.subscribe((data) => {
      this.customers = Object.values(data.customers.entities);
      console.log(" customer=> ", this.customers);
      this.fillData(this.customers);
    });
  }
  /****************************Delete Customer************************************ */
  delete() {
    if (confirm("Are You Sure You want to Delete the User?")) {
      var Customer = <Customer>this.selection.selected[0];
      this.store.dispatch(new customerActions.Delete(Customer.id));
      this.remplir();
    }
  }

  /**************************Edit Customer********************************************** */
  edit() {
    console.log("edit");
    var customer = <Customer>this.selection.selected[0];
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: customer,
      title: "Update " + customer.firstName,
    };
    this.dialog.open(CustomerEditComponent, dialogConfig);
    console.log("updated");
    this.reload();
  }
  /*********************************Add Customer********************************************** */
  add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      _currentObject: new Customer(),
      title: "Add ",
    };

    this.dialog.open(CustomerEditComponent, dialogConfig);
    this.reload();
  }
  /**********************Reload ************************************************* */
  reload() {
    this.dialog.afterAllClosed.subscribe((res) => this.remplir());
  }
}
