import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import  *  as  data  from 'src/app/data.json';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
//detail code
  products: any = (data as any).default;
  total=0;
  show:boolean = false;
  productForm = new FormGroup({
    id:new FormControl(0),
    name:new FormControl(''),
    description:new FormControl(''),
    tax:new FormControl(''),
    price:new FormControl(''),
    quantity:new FormControl(''),
    total:new FormControl(this.total)
  })

  showAdd(){
    this.show = !this.show;
  }

  addDetail(){
    var a = 0
    this.products.forEach(item =>{
      item.id > a ? item.id = a : null
    });
    console.log('a = ',a)
    this.productForm.setControl('id',new FormControl(a+1))
    this.products.push(this.productForm.value)
    console.log('product form : ',this.productForm.value)
    console.log(this.products)
    this.showAdd();
    localStorage.setItem('data', JSON.stringify(this.products));
    this.productForm.reset();
  }
 //end detail code

 invoiceForm = new FormGroup({
  id:new FormControl('0'),
  code: new FormControl(''),
  date: new FormControl(formatDate(new Date(), 'dd/MM/yyyy', 'en')),
  totalAmont: new FormControl(0),
  expedition: new FormControl(0),
  livraison: new FormControl(0),
  remise: new FormControl(),
  invoiceDetails: new FormControl([])
 })

  constructor() { }

  
  ngOnInit(): void {
    // this.myDate 
  }

  addInvoice(){
    console.log('invoice : ',this.invoiceForm.value);
  }

}
