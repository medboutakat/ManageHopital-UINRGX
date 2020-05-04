import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as DoctorActions from '../doctor-store/doctor.action'
import { Doctor } from '../doctor.model';
import { ContactHelper } from 'src/app/contacts/contact.helper';
import { Contact } from 'src/app/contacts/contact.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.scss', "../../app-edit.component.scss"]
})
export class DoctorEditComponent implements OnInit {



  cities
  _currentObject: Doctor;
  title: any;
  dialogref;
  doctorForm: FormGroup;
  contactForm: FormGroup;
  _currentContactObject: Contact;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) data, private store: Store, private dialog: MatDialog) {

    this._currentObject = data._currentObject;
    if (this._currentObject == null)
      this._currentObject = new Doctor();

    this._currentContactObject = this._currentObject.contactModel == null ? new Contact() : this._currentContactObject;

    this.title = data.title;
    console.log("current Object: ", this._currentObject);
  }

  ngOnInit() {

    this.contactForm = ContactHelper.getFormBuilder(this.fb, this._currentContactObject);

    this.doctorForm = this.fb.group({
      id: new FormControl(this._currentObject.id, Validators.required),
      firstName: new FormControl(this._currentObject.firstName, Validators.required),
      lastName: new FormControl(this._currentObject.lastName, Validators.required),
      sexe: new FormControl(this._currentObject.sexe, Validators.required),
      contactForm: this.contactForm
    });


  }


  reserve() {

    console.log("docForm", this.doctorForm.value);// use this "Added by Mohamed"
    var newApp = this.doctorForm.value

    console.log("objet contact", newApp)
    if (newApp.id == environment.EmptyGuid) {
      console.log("Add")
      this.store.dispatch(new DoctorActions.CreateDoctor(newApp));
      console.log("contact", newApp)

    }
    else {
      console.log("Update")
      console.log("id new app", newApp.id)
      this.store.dispatch(new DoctorActions.UpdateDoctor(newApp));
    }
    this.doctorForm.reset();
    console.log("success")
    this.dialog.closeAll();
  }



}