import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromCustomerCat from "src/app/customerCategorie/Store/reducer";  
import * as ActionsFile from 'src/app/customerCategorie/Store/Action'
import { CategoryHelper } from 'src/app/category/category.helper';
import { CategoryBaseComponent } from 'src/app/category/category-base.component';
import { Title } from '@angular/platform-browser';
import { CustomerCat } from '../customer-cat.model';

@Component({
  selector: 'customer-edit-cat',
  templateUrl: './customer-edit-cat.component.html',
  styleUrls: ['./customer-edit-cat.component.scss']
}) 
export class CustomerEditCatComponent extends CategoryBaseComponent<CustomerCat>   { 

  constructor(protected fb: FormBuilder,
    protected store: Store<fromCustomerCat.CustomerCatState>,
     @Inject(MAT_DIALOG_DATA) data,
     protected dialog:MatDialog,
     private titleService: Title
     )
   {
      super(fb,store,data,dialog);              
      this.titleService.setTitle('Customer category'+this._currentObject.name);          
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