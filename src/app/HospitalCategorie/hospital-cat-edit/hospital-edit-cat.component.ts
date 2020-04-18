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
 
  constructor( private fb: FormBuilder,
    private store: Store<fromHospitalCat.HospitalCatState>,
     @Inject(MAT_DIALOG_DATA) data
     )
   {
      this._currentObject=  data._currentObject;
      if(this._currentObject==null)
        this._currentObject=new HospitalCat();

      console.log("current Object: ", this._currentObject);    
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
    if(newApp.id=="")
        this.store.dispatch(new ActionsFile.CreateHospitalCat(newApp));
    else
        this.store.dispatch(new ActionsFile.UpdateHospitalCat(newApp));
    this.HospitalCatForm.reset();
    console.log("bien faite")    
  }
}
