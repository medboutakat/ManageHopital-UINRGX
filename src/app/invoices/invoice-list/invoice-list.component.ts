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

  constructor(private store: Store<any>, private router: Router) {
    this.store.dispatch(new invoiceAction.LoadInvoice());
    this.remplir();
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }
  ngOnInit() {

  }

  /***************************Displayed colmuns****************************************************** */
  displayedColumns: string[] = ['select', 'code', 'date', 'totalAmont', 'expedition', 'livraison', 'remise'];


  /*******************************Variables declared************************************************ */
  private rowSelection;
  private IsRowSelected: boolean = false;
  private IsMultple: boolean = false;
  finalAmount:number = 1;
  invoices: any
  dataSource: any
  selection: SelectionModel<Invoice>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  /***************************Apply filtre *************************************************** */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /**************************Methods(app-Menu)**************************************** */
  /**************************Load Data******************************** */
  remplir() {
    this.add=this.add.bind(this);
    this.edit=this.edit.bind(this);
    this.delete=this.delete.bind(this); 

    this.store.dispatch(new invoiceAction.LoadInvoice());  
    this.store.subscribe(data => {
      this.invoices = Object.values(data.invoices.entities)
      console.log(" invoices=> ", this.invoices)
      this.dataSource = new MatTableDataSource<Invoice>(this.invoices);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<Invoice>(true, []);
    })
  }


  /*****************************Select Methods**************************************************** */
  onrowselect() {
    this.IsMultple = this.selection.selected.length > 1;
    this.IsRowSelected = this.selection.selected.length == 1;
    this.IsRowSelected ? this.finalAmount = this.selection.selected[0].totalAmont: null;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));

  }
  

  id: string
  selected(row) {
    console.log("selected row", row)
    this.IsRowSelected = true
    this.id = row.id
  }

  checkboxLabel(row?: Invoice): string {

    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

 /****************************Invoice menu commands************************************ */
  add() {
    this.router.navigate(['/invoice'])
  }
  edit() {
    console.log("id", this.id)
    this.router.navigate(['/invoicewithId', this.id])
  }
  
   delete() {
    if (confirm("Are You Sure You want to Delete the User?")) {
      var Invoice = <Invoice>this.selection.selected[0];
      console.log("invoice deleted", Invoice.id);
      var id = Invoice.id
      this.store.dispatch(new invoiceAction.DeleteInvoice(id));
      this.remplir()
    }
  }
  
}



