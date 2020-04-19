import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as fromHospitalCat from "src/app/HospitalCategorie/Store/reducer";
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { HospitalCat } from '../hospitalCat.model';
import { MAT_DIALOG_DATA } from '@angular/material'; 

@Component({
  selector: 'hospital-cat-edit',
  templateUrl: './hospital-cat-edit.component.html',
  styleUrls: ['./hospital-cat-edit.component.scss']
})
export class  HospitalCatEditComponent implements OnInit {

  HospitalCatForm: FormGroup;
  listhopitalCatValues: any; 
 _currentObject: HospitalCat; 
  title:any;
  emptyGuid="00000000-0000-0000-0000-000000000000";

  constructor( private fb: FormBuilder,
    private store: Store<fromHospitalCat.HospitalCatState>,
     @Inject(MAT_DIALOG_DATA) data
     )
   {
    this._currentObject=  data._currentObject;
    this.title=  data.title; 
      console.log("current Object: ", this._currentObject);
      
    this.reserve=this.reserve.bind(this);      
   }
  ngOnInit() {
    this.HospitalCatForm = this.fb.group({
      id: [this._currentObject.id, Validators.required],
      name: [this._currentObject.name, Validators.required],
      remark: [this._currentObject.remark, Validators.required],
    });
  }

  reserve() {
    var newApp = this.HospitalCatForm.value as HospitalCat
    if(newApp.id=="00000000-0000-0000-0000-000000000000"){ 
      console.log("Add")
      this.store.dispatch(new ActionsFile.CreateHospitalCat(newApp));
    }
    else{ 
      console.log("Update")
      this.store.dispatch(new ActionsFile.UpdateHospitalCat(newApp));
    }
    this.HospitalCatForm.reset();
    console.log("success")    
  }
}
