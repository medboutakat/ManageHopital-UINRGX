import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as fromHospitalCat from "src/app/HospitalCategorie/Store/reducer";
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { HospitalCat } from '../hospitalCat.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';  
import { CategoryHelper } from 'src/app/category/category.helper';
import { CategoryBaseComponent } from 'src/app/category/category-base.component';

@Component({
  selector: 'hospital-cat-edit',
  templateUrl: './hospital-cat-edit.component.html',
  styleUrls: ['./hospital-cat-edit.component.scss']
})
 
export class HospitalCatEditComponent extends CategoryBaseComponent<HospitalCat>   { 

  constructor(protected fb: FormBuilder,
    protected store: Store<fromHospitalCat.HospitalCatState>,
     @Inject(MAT_DIALOG_DATA) data,
     protected dialog:MatDialog
     )
   {
      super(fb,store,data,dialog);        
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