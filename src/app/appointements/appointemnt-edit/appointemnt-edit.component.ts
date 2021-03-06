import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ActionsFiles from "src/app/hospitals/store/Action";

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as appsAction from 'src/app/appointements/store/appointement.actions'
import { Appointement } from '../appointement.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'appointemnt-edit',
  templateUrl: './appointemnt-edit.component.html',
  styleUrls: ['./appointemnt-edit.component.scss']
})
export class AppointemntEditComponent implements OnInit {
  apps
  addForm: FormGroup

  _currentObject: Appointement; 
  title:any; 
    
     constructor(private store: Store<any>, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) data) {
    this.store.dispatch(new ActionsFiles.LoadHospital());
    
    this.store.subscribe((data) => {
      this.apps = Object.values(data.Hospital.entities);
      console.log(" this.listhopital=> ", this.apps)
     
      
    });

    this._currentObject=  data._currentObject;
    this.title=  data.title; 
      console.log("current Object: ", this._currentObject);
      
    this.reserve=this.reserve.bind(this); 

  }

  ngOnInit() {

    this.addForm = this.fb.group({
      id: [this._currentObject.id, Validators.required],
      identityNo: [this._currentObject.identityNo, Validators.required],
      assurance: [this._currentObject.assurance, Validators.required],
      subject: [this._currentObject.subject, Validators.required],
      reservationTimeStamp: [this._currentObject.reservationTimeStamp, Validators.required],
      hospitalId: [this._currentObject.hospitalId, Validators.required],

    });
  }

  reserve() {

    var newApp = this.addForm.value as Appointement
    if(newApp.id==environment.EmptyGuid){ 
      console.log("Add")
      this.store.dispatch(new appsAction.CreateAppointement(newApp));
    }
    else{ 
      console.log("Update")
      this.store.dispatch(new appsAction.UpdateAppointements(newApp));
    }
    this.addForm.reset();
    console.log("success")  
  }
  }
  
