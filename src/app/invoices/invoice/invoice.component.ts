import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import  *  as  data  from 'src/app/data.json';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store'

import * as fromInvoice from '../store/Reducer'
import * as invoiceActions from '../store/Action'

import { Invoice } from '../invoice-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
//detail code
  products: any = (data as any).default;
  total= 0;
  show:boolean = false;
  productForm = new FormGroup({
    // id:new FormControl(''),
    product:new FormControl(''),
    description:new FormControl(''),
    tax:new FormControl(''),
    price:new FormControl(''),
    qte:new FormControl(''),
    total:new FormControl(this.total)
  })

  showAdd(){
    this.show = !this.show;
  }
//  a = 0
  addDetail(){
    // this.products.forEach(item =>{
    //   item.id > this.a ? this.a = item.id : null
    // });
    
    //this.productForm.get('id').patchValue(this.a+1)
    this.products.push(this.productForm.value)
    console.log('product form : ',this.productForm.value)
    console.log(this.products)
    this.showAdd();
    localStorage.setItem('data', JSON.stringify(this.products));
    this.productForm.reset();
    this.total=0;
  }

  deleteDetail(item,index){
    console.log('item : ',item)
    if(this.products[index] == item){
      //alert('item '+this.products[index].name+' is deleted')
      this.products.splice(index)
    }
    else alert('not same product, nothing was deleted')
  }

  valueChanged(qte,price,tax){
    this.total = qte*price;
    this.productForm.get("total").patchValue(this.total)
    console.log('total = ',qte*price)
  }
 //end detail code

 invoiceForm = new FormGroup({
  code: new FormControl(''),
  date: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
  totalAmont: new FormControl(0),
  expedition: new FormControl(0),
  livraison: new FormControl(0),
  remise: new FormControl(),
  invoiceDetails: new FormControl([])
 })

  constructor(private store:Store<fromInvoice.AppState>) { }
  
  ngOnInit(): void {
    // this.myDate 
    //const invoice$:Observable<Invoice> = this.store.select()
  }

  addInvoice(){
    this.invoiceForm.get('invoiceDetails').patchValue(this.products)
    console.log('invoice : ',this.invoiceForm.value);
    this.store.dispatch(new invoiceActions.CreateInvoice(this.invoiceForm.value));
    //this.invoiceForm.reset();
  }

}
