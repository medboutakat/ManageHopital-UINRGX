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
import { SettingEdiBaseComponent } from 'src/app/setting-edit-forms/setting-edit-base.component';
import { SettingEditHelper } from 'src/app/setting-edit-forms/setting-edit-base.helper';

@Component({
  selector: 'app-tax-edit',
  templateUrl: './tax-edit.component.html',
  styleUrls: ['./tax-edit.component.scss']
}) 
export class TaxEditComponent extends SettingEdiBaseComponent<Tax>   { 

   



  constructor(protected fb: FormBuilder,
    protected store: Store<fromTax.TaxState>,
     @Inject(MAT_DIALOG_DATA) data,
     protected dialog:MatDialog,
     private titleService: Title 
     )
   {
     
      super(fb,store,data,dialog);    
      this._formTemplate= this.getTemplate();
      this._settingForm = SettingEditHelper.getFormBuilder(this.fb,this._formTemplate, this._currentObject);  
      
      this.titleService.setTitle('Hospital category'+this._currentObject.name);          
      this.reserve=this.reserve.bind(this);


   }


   getTemplate(){

    return  [ 
      {
        "type":"hidden",//number
        "label":"id"
      },
      {
        "type":"textBox",//textBox
        "label":"name"
      },
      {
        "type":"textBox",//textBox
        "label":"value" 
      }

      // {
      //   "type":"select",
      //   "label":"value",
      //   "options":[2,5,15]
      // }
    ];

   } 

  ngOnInit() {    
 
  }

  reserve() {   
    var formValue= this.getFormValue();
    var actionName=this.getActionName(); 
    this.store.dispatch(new ActionsFile[actionName](formValue));
    this.end();
  }



}