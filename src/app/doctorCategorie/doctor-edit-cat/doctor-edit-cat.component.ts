import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromDoctorCat from "src/app/doctorCategorie/Store/reducer";
import { doctorCat } from '../doctorCat.module';
import * as ActionsFile from 'src/app/doctorCategorie/Store/Action'
import { environment } from 'src/environments/environment';
import { CategoryHelper } from 'src/app/category/category.helper';
import { CategoryBaseComponent } from 'src/app/category/category-base.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'doctor-edit-cat',
  templateUrl: './doctor-edit-cat.component.html',
  styleUrls: ['./doctor-edit-cat.component.scss']
}) 
export class DoctorEditCatComponent extends CategoryBaseComponent<doctorCat>   { 

  constructor(protected fb: FormBuilder,
    protected store: Store<fromDoctorCat.DoctorCatState>,
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