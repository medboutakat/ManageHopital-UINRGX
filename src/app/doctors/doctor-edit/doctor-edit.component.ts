import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
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
  dialogref
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) data, private store: Store, private dialog: MatDialog) {
    this._currentObject = data._currentObject;
    this.title = data.title;
    console.log("current Object: ", this._currentObject);
  }
  DoctorForm: FormGroup
  ContactForm: FormGroup

  ngOnInit() {

    // this.ContactForm = this.fb.group({
    //   id: new FormControl(this._currentObject.contact.id),
    //   email: new FormControl(this._currentObject.contact.email),
    //   fax: new FormControl(this._currentObject.contact.fax),
    //   phone1: new FormControl(this._currentObject.contact.phone1),
    //   adress1: new FormControl(this._currentObject.contact.phone2),
    //   cityId: new FormControl(this._currentObject.contact.cityId),
    //   phone2: new FormControl(this._currentObject.contact.phone2),
    //   adress2: new FormControl(this._currentObject.contact.adress2),
    //   whatsApp: new FormControl(this._currentObject.contact.whatsApp),
    // });
    this.DoctorForm = this.fb.group({
      id: new FormControl(this._currentObject.id),
      firstName: new FormControl(this._currentObject.firstName),
      lastName: new FormControl(this._currentObject.lastName),
      sexe: new FormControl(this._currentObject.sexe),
      // ContactForm: this.ContactForm
    });



  }


  reserve() {

    console.log("docForm", this.DoctorForm.value);// use this "Added by Mohamed"
    var newApp = this.DoctorForm.value

    console.log("objet contact", newApp)
    if (newApp.id == "00000000-0000-0000-0000-000000000000") {
      console.log("Add")
      this.store.dispatch(new DoctorActions.CreateDoctor(newApp));
      console.log("contact", newApp)

    }
    else {
      console.log("Update")
      console.log("id new app", newApp.id)
      this.store.dispatch(new DoctorActions.UpdateDoctor(newApp));
    }
    this.DoctorForm.reset();
    console.log("success")
    this.dialog.closeAll();
  }



}