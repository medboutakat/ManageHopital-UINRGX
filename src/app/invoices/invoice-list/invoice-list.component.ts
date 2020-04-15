import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import * as invoiceAction from '../store/Action'
import { Invoice } from '../invoice-model';
import jspdf from 'jspdf';
import { SelectionModel } from '@angular/cdk/collections';

/**
 * @title Table with pagination
 */

@Component({
  selector: 'invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  displayedColumns: string[] = ['code', 'date', 'totalAmont', 'expedition', 'livraison', 'remise', 'star'];
  displayedColumnsData: string[] = ['code', 'date', 'totalAmont', 'expedition', 'livraison', 'remise', 'star'];
  selection = new SelectionModel<Invoice>(true, []);


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {

  }
  invoices
  dataSource
  constructor(private store: Store<any>) {
    this.store.dispatch(new invoiceAction.LoadInvoice());
    this.store.subscribe(res => {
      this.invoices = res.invoices.invoices;
      console.log("invoice list", this.invoices);
      this.dataSource = new MatTableDataSource(this.invoices)
      this.dataSource.paginator = this.paginator;
    })

  }
  logdata(row) {
    console.log("row1", row)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Download() {

    var data = document.getElementById("content");
    const doc = new jspdf();
    doc.fromHTML(data.innerHTML, 30, 30);
    doc.save("facture n°.pdf");

  }

}



