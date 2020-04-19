import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DoctorComponent } from '../doctor/doctor.component';
import { Store } from '@ngrx/store';

import * as ActionsFile from 'src/app/doctors/doctorCategorie/Store/Action';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as DoctorActions from '../doctor-store/doctor.action'
import { Doctor } from '../doctor.model';


@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.scss']
})
export class DoctorEditComponent implements OnInit {



  cities
  _currentObject: Doctor;
  title: any;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) data, private store: Store
  ) {
    this._currentObject = data._currentObject;
    this.title = data.title;
    console.log("current Object: ", this._currentObject);
  }
  DoctorForm: FormGroup



  ngOnInit() {
    this.DoctorForm = this.fb.group({
      id: [this._currentObject.id, Validators.required],
      firstName: [this._currentObject.firstName, Validators.required],
      lastName: [this._currentObject.lastName, Validators.required],
      sexe: [this._currentObject.sexe, Validators.required]
    });


  }

  reserve() {
    var newApp = this.DoctorForm.value as Doctor
    if (newApp.id == "00000000-0000-0000-0000-000000000000") {
      console.log("Add")
      this.store.dispatch(new DoctorActions.CreateDoctor(newApp));
    }
    else {
      console.log("Update")
      console.log("id new app", newApp.id)
      this.store.dispatch(new DoctorActions.UpdateDoctor(newApp));
    }
    this.DoctorForm.reset();
    console.log("success")
  }



}