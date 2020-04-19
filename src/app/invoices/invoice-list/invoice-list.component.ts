import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import * as invoiceAction from '../store/Action'
import { Invoice } from '../invoice-model';
import jspdf from 'jspdf';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material';

/**
 * @title Table with pagination
 */

@Component({
  selector: 'invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'code', 'date', 'totalAmont', 'expedition', 'livraison', 'remise'];
  displayedColumnsData: string[] = ['code', 'date', 'totalAmont', 'expedition', 'livraison', 'remise', 'star'];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isAvailable = false;
  ngOnInit() {

  }
  invoices
  dataSource
  selection: SelectionModel<Invoice>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private store: Store<any>, private router: Router) {

    this.store.dispatch(new invoiceAction.LoadInvoice());  
    this.store.subscribe(data => {
      this.invoices = Object.values(data.invoices.entities)
      console.log(" invoices  ", this.invoices)
      this.dataSource = new MatTableDataSource<Invoice>(this.invoices);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<Invoice>(true, []);
    })

  }
  row
  logdata(row) {

    console.log("row1", row)
    this.row = row;
  }
  showRow(row) {
    console.log("row selected", row);

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
  add() {
    this.router.navigate(['/invoice'])

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row =>
        this.selection.select(row),

      );
  }
  edit() {

    console.log("id", this.id)
    this.router.navigate(['/invoicewithId', this.id])

  }
  id: string
  selected(row) {
    console.log("selected row", row)
    this.isAvailable = true
    this.id = row.id
  }

  onrowselect(row) {
    console.log("roow", row)

  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Invoice): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;

  }

}



