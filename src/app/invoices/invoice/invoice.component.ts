import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import  *  as  data  from 'src/app/data.json';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store'

import * as fromInvoice from '../store/Reducer'
import * as invoiceActions from '../store/Action'

import { Invoice, InvoiceDetail } from '../invoice-model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
//detail code
  products = [];
  total= 0;
  show:boolean = false;
  productForm = new FormGroup({
    product:new FormControl(''),
    description:new FormControl(''),
    qte:new FormControl(''),
    price:new FormControl(''),
    tax:new FormControl(''),
    total:new FormControl(this.total)
  })

  showAdd(){
    this.show = !this.show;
  }

  addDetail(){
    console.log('product form : ',this.productForm.value)
    this.subtotal += this.productForm.get('total').value
    this.products.push(this.productForm.value)
    console.log('product : ',this.products)
    this.showAdd();
    this.productForm.reset();
    this.total=0;
  }

  deleteDetail(item,index){
    console.log('item : ',item);
    this.subtotal -= item.total;
    this.products.splice(index,1);
  }

  valueChanged(qte,price,tax){
    this.total = qte*price;
    this.productForm.get("total").patchValue(this.total)
  }
  calculRemise(slct,remise){
    console.log("slct ;",slct)
    console.log("remise :",remise)
    let percent = (this.subtotal*remise)/100
    slct == 'dh' ? this.remiseval = remise - remise*2 : this.remiseval = percent-percent*2
  }
  Amount(remise,exp,liv){
    this.TotalAmount =this.subtotal + Number(exp.value) + Number(liv.value) + remise
  }
 //end detail code

 id:string='0';
 subtotal:number = 0;
 remiseval:number = 0
 TotalAmount:number = 0;
 isNew:boolean;

 invoiceForm = new FormGroup({
    code: new FormControl(''),
    date: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
    expedition: new FormControl(0),
    livraison: new FormControl(0),
    remise: new FormControl(this.remiseval),
    totalAmont: new FormControl(this.TotalAmount)
 })

  constructor(
    private store:Store<fromInvoice.AppState>,
    private routeValue:ActivatedRoute,
    private router:Router
    ) { 
    this.routeValue.paramMap.subscribe(params => this.id=params.get('id'))
    //this.id =  "214b787f-1bec-4b98-e21b-08d7df1b978e"
  }

  invoice:Invoice = null

  ngOnInit(): void {
    console.log('ID : ',this.id)
    this.id == null? this.isNew=true : this.isNew=false;//verefication ADD or EDIT

    if(!this.isNew){
      this.store.dispatch(new invoiceActions.LoadOneInvoice(this.id));
      this.store.subscribe(state => {
        this.invoice = state.invoices.entities[this.id] as Invoice
        if (this.invoice == null) {
        } else {
          this.invoice.invoiceDetails.forEach(item=>
            {
              this.products.push(item);
              this.subtotal += item.total; 
            });
          this.invoiceForm.setValue({code:this.invoice.code,date:this.invoice.date,expedition:this.invoice.expedition,
                            livraison:this.invoice.livraison,remise:this.invoice.remise,totalAmont:this.invoice.totalAmont})
          console.log("invoice : ", this.invoice)
          console.log("invoiceDetails : ", this.invoice.invoiceDetails)
        }
      })
    }
  }

  addInvoice(){
    this.invoiceForm.get('totalAmont').patchValue(this.TotalAmount);
    this.invoiceForm.setControl('invoiceDetails', new FormControl(this.products));
    console.log('invoice : ',this.invoiceForm.value);
    this.store.dispatch(new invoiceActions.CreateInvoice(this.invoiceForm.value));
    this.router.navigate(['invoices'])
  }
  updatedInvoice:Invoice
  updateInvoice(){
    console.log("updatedInvoice form : ",this.invoiceForm.value);

    this.updatedInvoice = {
      id:this.id,
      code:this.invoiceForm.get('code').value,
      date:this.invoiceForm.get('date').value,
      livraison:this.invoiceForm.get('livraison').value,
      remise:this.invoiceForm.get('remise').value,
      totalAmont:this.invoiceForm.get('totalAmont').value,
      expedition:this.invoiceForm.get('expedition').value,
      invoiceDetails:this.products
    }
    console.log("updatedInvoice : ",this.invoiceForm.value);
    this.store.dispatch(new invoiceActions.UpdateInvoice(this.updatedInvoice));
    console.log("Updated is done ");
    this.router.navigate(['invoices'])
  }

}
