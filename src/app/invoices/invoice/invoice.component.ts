import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Store } from "@ngrx/store";
import * as invoiceAction from "../store/Action";
import { Invoice } from "../invoice-model";
import jspdf from "jspdf";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import { MatSort } from "@angular/material";
import { PageConfig } from "src/app/config";
import { AppListViewBaseComponent } from "src/app/app-list-view-base.component";

/**
 * @title Table with pagination
 */

@Component({
  selector: "invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent extends AppListViewBaseComponent<Invoice>
  implements OnInit {

  /*******************************Variables declared************************************************ */ 
  finalAmount: number = 1;
  invoices: any;  

  constructor(private store: Store<any>, private router: Router) {
    super();

   this.displayedColumns = [
      "select",
      "code",
      "date",
      "totalAmont",
      "expedition",
      "livraison",
      "remise",
    ];

    
    this.store.dispatch(new invoiceAction.LoadInvoice());
    this.remplir();

    super.bindMethods('add','edit','delete');

  }

  ngOnInit() {}

  /***************************Displayed colmuns****************************************************** */
  
 
    
  /**************************Load Data******************************** */
  remplir() {
   
    this.store.dispatch(new invoiceAction.LoadInvoice());
    this.store.subscribe((data) => {
      this.invoices = Object.values(data.invoices.entities);
      console.log(" invoices=> ", this.invoices);
      this.fillData(this.invoices);  
    });
  }
  
  /****************************Invoice menu commands************************************ */
  add() {
    this.router.navigate(["/invoice"]);
  }
  edit() {
    var Invoice = <Invoice>this.selection.selected[0];
    this.router.navigate(["/invoicewithId", Invoice.id]);
  }

  delete() {
    if (confirm("Are You Sure You want to Delete the User?")) {
      var Invoice = <Invoice>this.selection.selected[0];
      console.log("invoice deleted", Invoice.id);
      var id = Invoice.id;
      this.store.dispatch(new invoiceAction.DeleteInvoice(id));
      this.remplir();
    }
  }
}
