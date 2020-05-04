import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromProductCat from "src/app/productCategorie/Store/reducer";
import { productCat } from '../productCat.module';
import * as ActionsFile from 'src/app/productCategorie/Store/Action'
import { environment } from 'src/environments/environment';
import { CategoryHelper } from 'src/app/category/category.helper';
@Component({
  selector: 'product-edit-cat',
  templateUrl: './product-edit-cat.component.html',
  styleUrls: ['./product-edit-cat.component.scss']
})
export class ProductEditCatComponent implements OnInit {

  _categoryForm: FormGroup; 
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
    this._categoryForm = CategoryHelper.getFormBuilder(this.fb,this._currentObject);  
  }

  reserve() {
    var newApp = this._categoryForm.value as productCat
    var actionName=CategoryHelper.getActionName(newApp); 
    console.log("actionName",actionName)
    this.store.dispatch(new ActionsFile[actionName](newApp));
    this._categoryForm.reset();
    this.dialog.closeAll();
  }
}