import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor() { }

  myDate
  ngOnInit(): void {
    this.myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
  }

}
