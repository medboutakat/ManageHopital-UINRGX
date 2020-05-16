import { Component, OnInit } from "@angular/core";
import { formatDate } from "@angular/common";
import * as data from "src/app/data.json";
import { FormGroup, FormControl, FormBuilder, FormArray, NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as fromInvoice from "../store/Reducer";
import * as invoiceActions from "../store/Action";
import { Invoice, InvoiceDetail } from "../invoice-model"; 
import { ActivatedRoute, Router } from "@angular/router"; 
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Product } from 'src/app/products/product.Module';
import * as ActionsProductFile from "src/app/products/Store/Action";
import * as fromProduct from "../../products/store/Reducer";
import { selectOne } from 'src/app/doctorCategorie/Store/doctorCat.selector';
import { ProductService } from 'src/app/products/Product.service';

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice-edit.component.html",
  styleUrls: ["./invoice-edit.component.css"],
})
export class InvoiceEditComponent implements OnInit {
  //detail code
  total = 0;
  show: boolean = false;

  addDetail(index) {
    var detailRow=this.invoice.newEmptyRow();
    var produForm=this.invoiceForm.get("productForm");
    var detailForm=this.buildFormDynamic(detailRow);
 

    detailForm.get("product").valueChanges.subscribe(x => {
      console.log('firstname value changed :',x)
   })
 
    produForm.insert(index+1,detailForm );
    this.ManageNameControl(produForm.length-1)
  }

  deleteDetail(index) { 
    var produForm=this.invoiceForm.get("productForm") 
    console.log("produForm",produForm); 
    produForm.removeAt(index);
    this.recalculate();
  }

  move(index,seed:number){
    var produForm=this.invoiceForm.get("productForm");

    var indexSeed=index+seed;
    
    console.log("indexSeed",indexSeed);

    if((seed==-1 && indexSeed<=0) ||(seed==1 && indexSeed>=produForm.controls.length))
     return
    [produForm.controls[index], produForm.controls[indexSeed]] = [produForm.controls[indexSeed], produForm.controls[index]];   
    
  }

  valueChanged(formDetail) {
    console.log("formdetail",formDetail);
    let qteValue= formDetail.get("qte").value;
    let priceValue=formDetail.get("price").value;
    let taxValue=formDetail.get("tax").value;
    let totalValue=qteValue*priceValue;

    formDetail.get("total").setValue(totalValue);
    this.recalculate();
  }
  keuUp(name,Detail){
    /* WE USE THE SRVICE JUST FOR THAT MOMENT
     WHILE GET BY NAME IN STORE WILL BE READY*/
    if(this.options.includes(name)){
      this.prdServ.getByName(name).subscribe(res=>{
        console.log('res : ',res[0]);
        Detail.get('qte').setValue(res[0].quantityPerUnit);
        Detail.get("price").setValue(res[0].unitPrice);
        Detail.get("tax").setValue(res[0].unitsInStock);
        Detail.get("product").setValue(res[0].name);
      })
      //get by name using the store
      //console.log('PRODUCT STORE : ',this.storeProduct)
    // this.storeProduct.dispatch(new ActionsProductFile.LoadOneByName(productInput.value));
    // this.storeProduct.select('products').subscribe((data) => {
    //   console.log('DATA : ',data)
    // });
    // this.storeProduct.subscribe((data) => {
    //   console.log('DATA : ',data.products);
    // });
    }
  }
  
  recalculate(){
    var produForm=this.invoiceForm.value.productForm as (InvoiceDetail[])  
    this.subtotal=0;
    produForm.forEach((item) => {
      this.subtotal += item.total;    
    });  
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

  myControl = new FormControl() ;
  product$:Product[]
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(
    private store: Store<fromInvoice.AppState>,
    private storeProduct: Store<fromProduct.AppState>,
    private routeValue: ActivatedRoute,
    private router: Router,private fb :FormBuilder,
    private prdServ:ProductService
  ) {
    
      this.getproducts();

      this.routeValue.paramMap.subscribe(
        (params) => (this.id = params.get("id"))
      );
    //this.id =  "214b787f-1bec-4b98-e21b-08d7df1b978e"
  }

  getproducts(){
    this.storeProduct.dispatch(new ActionsProductFile.Load());
    this.storeProduct.subscribe((data) => {
      this.product$ = Object.values(data.products.entities);
      this.options=[];
      this.product$.forEach(item=>{
        this.options.push(item.name)
      });
      console.log('products is got \nauto complite options : ',this.options)
    });
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
      arr.push(this.buildFormDynamic(item))
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
    });
    console.log("Invoice form : ",this.invoiceForm.value)
    //autocomplite code
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.ManageNameControl(0);
  }

  //autocomplite method
  displayFn(invoiceDetails?: string): string | undefined {
    return invoiceDetails ? invoiceDetails : undefined;
  }
  //filter methode 1
  private _filter(name: string) {
    console.log("VALUE=",name)
    const filterValue = name.toLowerCase();
    return this.options.filter(option =>option.toLowerCase().indexOf(filterValue) === 0);
  }

  //filter methode 2 (you can chose what you want 1 or 2)
  // private _filter(value: string): string[] {
  //   const filterValue = this._normalizeValue(value);
  //   return this.options.filter(street => this._normalizeValue(street).includes(filterValue));
  // }

  // private _normalizeValue(value: string): string {
  //   return value.toLowerCase().replace(/\s/g, '');
  // }
  
  ManageNameControl(index: number) {
    var arrayControl = this.invoiceForm.get('productForm') as FormArray;
    this.filteredOptions[index] = arrayControl.at(index).get('product').valueChanges
      .pipe(
      startWith<string | InvoiceDetail>(''),
      map(value => typeof value === 'string' ? value : value.product),
      map(name => name ? this._filter(name) : this.options.slice())
      );
  }

buildFormDynamic(detail:InvoiceDetail):FormGroup{  
    return this.fb.group({
      product:new FormControl(detail.product),
      description: new FormControl(detail.description),
      qte:new FormControl(detail.qte),
      price:new FormControl(detail.price),
      tax: new FormControl(detail.tax),
      total:new FormControl(detail.total),
     })
   }
  
 

  
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
