import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromDoctorCat from "src/app/doctorCategorie/Store/reducer";
import { doctorCat } from '../doctorCat.module';
import * as ActionsFile from 'src/app/doctorCategorie/Store/Action'
import { environment } from 'src/environments/environment';
import { CategoryHelper } from 'src/app/category/category.helper';

@Component({
  selector: 'doctor-edit-cat',
  templateUrl: './doctor-edit-cat.component.html',
  styleUrls: ['./doctor-edit-cat.component.scss']
})
export class DoctorEditCatComponent implements OnInit {

 _categoryForm: FormGroup;  
 _currentObject: doctorCat; 
  title:any; 

  constructor( private fb: FormBuilder,
    private store: Store<fromDoctorCat.DoctorCatState>,
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
    var newApp = this._categoryForm.value as doctorCat
    var actionName=CategoryHelper.getActionName(newApp); 
    console.log("actionName",actionName)
    this.store.dispatch(new ActionsFile[actionName](newApp));
    this._categoryForm.reset();
    this.dialog.closeAll();
  }
}

