import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_DIALOG_DATA } from '@angular/material';
import { HopitalComponent } from '../hopital/hopital.component';
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Hospital } from '../hospital.model';
import { Contact } from 'src/app/contacts/contact.model';
import * as ActionsFiles from 'src/app/hospital/store/Action'

@Component({
  selector: 'app-hospital-edit',
  templateUrl: './hospital-edit.component.html',
  styleUrls: ['./hospital-edit.component.scss']
})



export class HospitalEditComponent implements OnInit {

  HospitalForm: FormGroup;
  listhopitalValues: any; 
 _currentObject: Hospital; 
  title:any;
  emptyGuid="00000000-0000-0000-0000-000000000000";

  listhopitalCatValues: unknown[];
  contactFormControl: FormGroup;

 _currentContactObject: Contact; 

  constructor(private _bottomSheetRef: MatBottomSheetRef<HopitalComponent>, private store: Store<any>,   @Inject(MAT_DIALOG_DATA) data,private fb: FormBuilder,) {
   
    this.store.dispatch(new ActionsFile.LoadHospitalCat());
    this.store.subscribe(data => {
      this.listhopitalCatValues = Object.values(data.HospitalCat.entities)
      console.log(" this.listhopitalCatValues=> ", this.listhopitalCatValues)
    }
    );
    this._currentObject=  data._currentObject;
    this.title=  data.title; 
      console.log("current Object: ", this._currentObject);
      
    this.reserve=this.reserve.bind(this);      
  }

  ngOnInit() {
    this.contactFormControl= this.fb.group({
      // id: new FormControl(''),
      adress1: new FormControl(''),
      adress2: new FormControl(''),
      email: new FormControl(''),
      fax:  new FormControl(''),
      phone1: new FormControl(''),
      phone2:  new FormControl(''),
      whatsApp:  new FormControl(''),
      cityId: new FormControl(''),
      CovePathForm: new FormControl(''),
      PictureProfilePathForm: new FormControl(''),
    });

    this.HospitalForm = this.fb.group({
      id: [this._currentObject.id, Validators.required],
      countryHealthId:  [this._currentObject.countryHealthId, Validators.required],
      name: [this._currentObject.name, Validators.required],
      remark: [this._currentObject.remark, Validators.required],
      history: [this._currentObject.history, Validators.required],
      hospitalCategoryId: [this._currentObject.hospitalCategoryId, Validators.required],
      categoryName:  [this._currentObject.categoryName, Validators.required],
      contactFormControl:this.contactFormControl
    });
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  getContact(contact) {
    console.log('Contact : ', contact);
  }

  reserve() {
    var newApp = this.HospitalForm.value as Hospital
    if(newApp.id=="00000000-0000-0000-0000-000000000000"){ 
      console.log("Add")
      this.store.dispatch( new ActionsFiles.CreateHospital(newApp));
    }
    else{ 
      console.log("Update")
      this.store.dispatch(new ActionsFiles.UpdateHospital(newApp));
    }
    this.HospitalForm.reset();
    console.log("success")    
  }


  onFileSelectCover(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.HospitalForm.get('CovePath').setValue(file); 
    }
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]; 
      this.HospitalForm.get('PictureProfilePath').setValue(file); 
    }
  }
}
