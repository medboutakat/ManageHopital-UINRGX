import { Component, OnInit } from "@angular/core";
import { formatDate } from "@angular/common";
import * as data from "src/app/data.json";
import { FormGroup, FormControl, FormBuilder, FormArray, NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as fromInvoice from "../store/Reducer";
import * as invoiceActions from "../store/Action";
import { Invoice, InvoiceDetail } from "../invoice-model"; 
import { ActivatedRoute, Router } from "@angular/router"; 

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.css"],
})
export class InvoiceComponent implements OnInit {
  //detail code
  total = 0;
  show: boolean = false;

   
  addDetail(index) {
    var detailRow=this.invoice.newEmptyRow();
    var produForm=this.invoiceForm.get("productForm") 
    produForm.insert(index+1, this.BuildFormDynamic(detailRow)); 
  }
  addItem() {
    // const formArray  = this.array;
    // formArray.insert(0, this.fb.control(formArray.length + 1));
  }
  deleteDetail(item, index) { 
    var produForm=this.invoiceForm.get("productForm") 
    produForm.remove(index); 
  }

  valueChanged(formDetail) { 
    console.log("formdetail",formDetail)
    let qteValue= formDetail.get("qte").value;
    let priceValue=formDetail.get("price").value;
    let taxValue=formDetail.get("tax").value;
    let totalValue=qteValue*priceValue;    
    formDetail.get("total").setValue(totalValue);  

    var produForm=this.invoiceForm.value.productForm as (InvoiceDetail[]) 
     
    // var invoice= this.invoiceForm.value as Invoice
    produForm.forEach((item) => {
      this.subtotal += item.total;    
    }); 

    console.log("array",produForm )
    // this.invoiceForm.get("subtotal").setValue(this.subtotal);  
  }
  calculRemise(slct, remise) {
    console.log("slct ;", slct);
    console.log("remise :", remise);
    let percent = (this.subtotal * remise) / 100;
    slct == "dh"
      ? (this.remiseval = remise - remise * 2)
      : (this.remiseval = percent - percent * 2);
  }
  Amount(remise, exp, liv) {
    this.TotalAmount =
      this.subtotal + Number(exp.value) + Number(liv.value) + remise;
  }
  //end detail code

  id: string = "0";
  subtotal: number = 0;
  remiseval: number = 0;
  TotalAmount: number = 0;
  isNew: boolean;



  constructor(
    private store: Store<fromInvoice.AppState>,
    private routeValue: ActivatedRoute,
    private router: Router,private fb :FormBuilder
  ) {
    this.routeValue.paramMap.subscribe(
      (params) => (this.id = params.get("id"))
    );
    //this.id =  "214b787f-1bec-4b98-e21b-08d7df1b978e"
  }

  invoice: Invoice = null;

  ngOnInit(): void {
    console.log("ID : ", this.id);
    this.id == null ? (this.isNew = true) : (this.isNew = false); //verefication ADD or EDIT

    if (!this.isNew) {
      console.log("this.isNew : ", this.id);
      this.store.dispatch(new invoiceActions.LoadOneInvoice(this.id));
      this.store.subscribe((state) => {
        this.invoice = state.invoices.entities[this.id] as Invoice;
        if (this.invoice == null) {
        } else {
          this.initialze();
        }
      });
    } else {
      this.invoice = new Invoice();
      this.invoice.firstEmptyRow();
      console.log("new but initialize rows", this.invoice);
      this.initialze();
    }
  }

  invoiceForm ;
  initialze() {
    let arr=[];  
    this.invoice.invoiceDetails.forEach((item) => {
      this.subtotal += item.total;
      arr.push(this.BuildFormDynamic(item))     
    }); 
    console.log("invoice : ", this.invoice);   
    this.invoiceForm =  this.fb.group({  
      code: new FormControl(this.invoice.code),
      date: new FormControl(formatDate(this.invoice.date, "yyyy-MM-dd", "en")),
      expedition: new FormControl(this.invoice.expedition),
      livraison: new FormControl(this.invoice.livraison),
      remise: new FormControl(this.invoice.remise),
      totalAmont: new FormControl(this.invoice.totalAmont), 
      productForm:this.fb.array(arr)  
    })  

    console.log("Invoice form: ",this.invoiceForm)
  }

BuildFormDynamic(detail:InvoiceDetail):FormGroup{  
    return this.fb.group({  
      product:[detail.product],
      description: [detail.description],
      qte: [detail.qte],
      price:[detail.price],
      tax: [detail.tax],
      total: [detail.total],
     })  
   }  
  
  productForm = new FormGroup({
    product: new FormControl(""),
    description: new FormControl(""),
    qte: new FormControl(0),
    price: new FormControl(0),
    tax: new FormControl(0),
    total: new FormControl(this.total),
  });

  
  edit(isNew) {
    console.log(""+(isNew?'New':"update")+" : ", this.invoiceForm.value);
    if (isNew) {
      this.invoiceForm.get("totalAmont").patchValue(this.TotalAmount);
      this.invoiceForm.setControl(
        "invoiceDetails",
        new FormControl(this.invoice.invoiceDetails)
      );
      this.store.dispatch(
        new invoiceActions.CreateInvoice(this.invoiceForm.value)
      );
    } else {
      console.log("updatedInvoice form : ", this.invoiceForm.value);
      this.invoice.id = this.id;
      this.invoice.code = this.invoiceForm.get("code").value;
      this.invoice.date = this.invoiceForm.get("date").value;
      this.invoice.livraison = this.invoiceForm.get("livraison").value;
      this.invoice.remise = this.invoiceForm.get("remise").value;
      this.invoice.totalAmont = this.invoiceForm.get("totalAmont").value;
      this.invoice.expedition = this.invoiceForm.get("expedition").value;
      this.invoice.invoiceDetails = this.invoice.invoiceDetails;
      this.store.dispatch(new invoiceActions.UpdateInvoice(this.invoice));
    }

    // this.backHome();
  }

  backHome() {
    this.router.navigate(["invoices"]);
  }
}
