import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromProductCat from "src/app/productCategorie/Store/reducer";
import { productCat } from '../productCat.module';
import * as ActionsFile from 'src/app/productCategorie/Store/Action'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'product-edit-cat',
  templateUrl: './product-edit-cat.component.html',
  styleUrls: ['./product-edit-cat.component.scss']
})
export class ProductEditCatComponent implements OnInit {
  ProductcAT: FormGroup;
  listProductCatValues: any; 
  _currentObject: productCat; 
  title:any; 

  constructor( private fb: FormBuilder,
    private store: Store<fromProductCat.ProductCatState>,
     @Inject(MAT_DIALOG_DATA) data,
     private dialog:MatDialog
     )
   {
    this._currentObject=  data._currentObject;
    this.title=  data.title;
      console.log("current Object: ", this._currentObject);
      
    this.reserve=this.reserve.bind(this);
   }

  ngOnInit() {
    this.ProductcAT = this.fb.group({
      id: [this._currentObject.id, Validators.required],
      name: [this._currentObject.name, Validators.required],
      remark: [this._currentObject.remark, Validators.required],
    });
  }

  reserve() {
    var newApp = this.ProductcAT.value as productCat
    if(newApp.id==environment.EmptyGuid){ 
      console.log("Add")
      this.store.dispatch(new ActionsFile.CreateProductCat(newApp));
    }
    else{ 
      console.log("Update")
      this.store.dispatch(new ActionsFile.UpdateProductCat(newApp));
    }
    this.ProductcAT.reset();
    this.dialog.closeAll();
  }
}