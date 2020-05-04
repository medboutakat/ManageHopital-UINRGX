import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as fromHospitalCat from "src/app/HospitalCategorie/Store/reducer";
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { HospitalCat } from '../hospitalCat.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material'; 
import { environment } from 'src/environments/environment';
import { CategoryHelper } from 'src/app/category/category.helper';

@Component({
  selector: 'hospital-cat-edit',
  templateUrl: './hospital-cat-edit.component.html',
  styleUrls: ['./hospital-cat-edit.component.scss']
})
export class  HospitalCatEditComponent implements OnInit {

  _categoryForm: FormGroup; 
  _currentObject: HospitalCat; 
  _title:string; 

  constructor( private fb: FormBuilder,
    private store: Store<fromHospitalCat.HospitalCatState>,
     @Inject(MAT_DIALOG_DATA) data,
     private dialog:MatDialog
     )
   {
    this._currentObject=  data._currentObject;
    this._title=  data.title; 
    console.log("current Object: ", this._currentObject);
       
    this.reserve=this.reserve.bind(this); 
   }
  ngOnInit() {
    this._categoryForm = CategoryHelper.getFormBuilder(this.fb,this._currentObject); 
  }

  reserve() {
    var newApp = this._categoryForm.value as HospitalCat
    var actionName=CategoryHelper.getActionName(newApp); 
    this.store.dispatch(new ActionsFile[actionName](newApp));
    this._categoryForm.reset(); 
    this.dialog.closeAll();
  }
}
