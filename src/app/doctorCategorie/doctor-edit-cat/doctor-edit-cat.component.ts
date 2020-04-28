import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromDoctorCat from "src/app/doctors/doctorCategorie/Store/reducer";
import { doctorCat } from '../doctorCat.module';
import * as ActionsFile from 'src/app/doctors/doctorCategorie/Store/Action'
@Component({
  selector: 'doctor-edit-cat',
  templateUrl: './doctor-edit-cat.component.html',
  styleUrls: ['./doctor-edit-cat.component.scss']
})
export class DoctorEditCatComponent implements OnInit {
  DoctorcAT: FormGroup;
  listdoctorCatValues: any; 
 _currentObject: doctorCat; 
  title:any;
  emptyGuid="00000000-0000-0000-0000-000000000000";

  constructor( private fb: FormBuilder,
    private store: Store<fromDoctorCat.DoctorCatState>,
     @Inject(MAT_DIALOG_DATA) data
     )
   {
    this._currentObject=  data._currentObject;
    this.title=  data.title; 
      console.log("current Object: ", this._currentObject);
      
    this.reserve=this.reserve.bind(this);      
   }
  ngOnInit() {
    this.DoctorcAT = this.fb.group({
      id: [this._currentObject.id, Validators.required],
      name: [this._currentObject.name, Validators.required],
      remark: [this._currentObject.remark, Validators.required],
    });
  }

  reserve() {
    var newApp = this.DoctorcAT.value as doctorCat
    if(newApp.id=="00000000-0000-0000-0000-000000000000"){ 
      console.log("Add")
      this.store.dispatch(new ActionsFile.CreateDoctorCat(newApp));
    }
    else{ 
      console.log("Update")
      this.store.dispatch(new ActionsFile.UpdateDoctorCat(newApp));
    }
    this.DoctorcAT.reset();
    console.log("success")    
  }
}

