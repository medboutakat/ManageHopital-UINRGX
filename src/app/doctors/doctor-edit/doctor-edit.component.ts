import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as DoctorActions from '../doctor-store/doctor.action'
import { Doctor } from '../doctor.model';
import { ContactHelper } from 'src/app/contacts/contact.helper';
import { Contact } from 'src/app/contacts/contact.model';
import { environment } from 'src/environments/environment';
import * as ActionsFile from 'src/app/DoctorCategorie/Store/Action' 

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
  mainForm: FormGroup;
  contactForm: FormGroup;
  _currentContactObject: Contact;
  _listCatetory;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) data, private store: Store<any>, private dialog: MatDialog) {

    this.store.dispatch(new ActionsFile.Load());
    this.store.subscribe(d => {
      this._listCatetory = Object.values(d.DoctorCat.entities)
      console.log(" this._listCatetory=> ", this._listCatetory)
    });


    this._currentObject = data._currentObject;

    if (this._currentObject == null)
      this._currentObject = new Doctor();

    this._currentContactObject = this._currentObject.contactModel == null ? new Contact() : this._currentContactObject;

    this.title = data.title;
    
    console.log("current Object: ", this._currentObject);
    this.reserve=this.reserve.bind(this); 
  }

  ngOnInit() {

    this.contactForm = ContactHelper.getFormBuilder(this.fb, this._currentContactObject);

    this.mainForm = this.fb.group({
      id: new FormControl(this._currentObject.id, Validators.required),
      firstName: new FormControl(this._currentObject.firstName, Validators.required),
      lastName: new FormControl(this._currentObject.lastName, Validators.required),
      sexe: new FormControl(this._currentObject.sexe, Validators.required), 
      doctorCategoryId: [this._currentObject.doctorCategoryId, Validators.required],
      contactModel:this.contactForm
    });


  }


  reserve() {

    console.log("mainForm", this.mainForm.value);
    var newApp = <Doctor>this.mainForm.value
    newApp.contactModel.cityId=+ newApp.contactModel.cityId;

    console.log("objet docForm", newApp)
    if (newApp.id == environment.EmptyGuid) { 
      this.store.dispatch(new DoctorActions.CreateDoctor(newApp)); 
    }
    else { 
      this.store.dispatch(new DoctorActions.UpdateDoctor(newApp));
    }
    this.mainForm.reset(); 
    this.dialog.closeAll();
  }



}