import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromTax from "src/app/Tax/Store/reducer";
import { Tax } from '../tax.Module';
import * as ActionsFile from 'src/app/Tax/Store/Action' 
import { CategoryHelper } from 'src/app/category/category.helper';
import { CategoryBaseComponent } from 'src/app/category/category-base.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tax-edit',
  templateUrl: './tax-edit.component.html',
  styleUrls: ['./tax-edit.component.scss']
}) 
export class TaxEditComponent extends CategoryBaseComponent<Tax>   { 

  constructor(protected fb: FormBuilder,
    protected store: Store<fromTax.TaxState>,
     @Inject(MAT_DIALOG_DATA) data,
     protected dialog:MatDialog,
     private titleService: Title
     )
   {
      super(fb,store,data,dialog);              
      this.titleService.setTitle('Hospital category'+this._currentObject.name);          
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