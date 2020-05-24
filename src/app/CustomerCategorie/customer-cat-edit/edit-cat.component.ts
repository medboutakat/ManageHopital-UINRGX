import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/CustomerCategorie/Store/Action' 
import * as fromCustomerCat from "src/app/CustomerCategorie/Store/reducer";
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';  
import { CategoryHelper } from 'src/app/category/category.helper';
import { CategoryBaseComponent } from 'src/app/category/category-base.component';
import { Title } from '@angular/platform-browser';
import { CustomerCat } from '../customer-cat.model';

@Component({
  selector: 'CustomerCat-edit',
  templateUrl: './cat-edit.component.html',
  styleUrls: ['./cat-edit.component.scss']
})
 
export class CatEditComponent extends CategoryBaseComponent<CustomerCat>   { 

  constructor(protected fb: FormBuilder,
    protected store: Store<fromCustomerCat.CustomerCatState>,
     @Inject(MAT_DIALOG_DATA) data,
     protected dialog:MatDialog,
     private titleService: Title
     )
   {
      super(fb,store,data,dialog);              
      this.titleService.setTitle('CustomerCat category '+this._currentObject.name);       
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