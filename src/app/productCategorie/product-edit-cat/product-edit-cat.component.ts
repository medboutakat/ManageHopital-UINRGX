import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromProductCat from "src/app/productCategorie/Store/reducer";
import { productCat } from '../productCat.module';
import * as ActionsFile from 'src/app/productCategorie/Store/Action' 
import { CategoryHelper } from 'src/app/category/category.helper';
import { CategoryBaseComponent } from 'src/app/category/category-base.component';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'product-edit-cat',
  templateUrl: './product-edit-cat.component.html',
  styleUrls: ['./product-edit-cat.component.scss']
})
export class ProductEditCatComponent extends CategoryBaseComponent<productCat>   { 

  constructor(protected fb: FormBuilder,
    protected store: Store<fromProductCat.ProductCatState>,
     @Inject(MAT_DIALOG_DATA) data,
     protected dialog:MatDialog,
     private titleService: Title
     )
   {
      super(fb,store,data,dialog);              
      this.titleService.setTitle('Product category'+this._currentObject.name);   

      this.reserve=this.reserve.bind(this);
   }

  ngOnInit() {    
    this._categoryForm = CategoryHelper.getFormBuilder(this.fb,this._currentObject);  
  }

  reserve() {   
    var formValue= this.getFormValue();
    var actionName=this.getActionName(); 
    this.store.dispatch(new ActionsFile[actionName](formValue));
    this.end();
  }
}