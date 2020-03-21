import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from 'src/app/contacts/contact/contact.component';
import { MatBottomSheetRef } from '@angular/material';
import { DoctorComponent } from '../doctor/doctor.component';
import { Store } from '@ngrx/store';

import * as ActionsFile from 'src/app/doctors/doctorCategorie/Store/Action';
import { doctorCat } from '../doctorCategorie/doctorCat.module';
import { FormGroup, FormControl } from '@angular/forms';
import { Contact } from 'src/app/contacts/contact.model';

interface Sexe {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.scss']
})
export class DoctorEditComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  listDoctorCat:doctorCat[];
  contact:Contact;
  catId

  genders:Sexe[] = [
    {value: 'men', viewValue: 'Men'},
    {value: 'women', viewValue: 'Women'},
    {value: 'other', viewValue: 'Other'}
  ];

  doctorForm:FormGroup = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    sexe: new FormControl(''),
    contactId: new FormControl(''),
    contact: new FormControl(),
    categoryId: new FormControl('')
  })

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<DoctorComponent>,
    private CategoryStore: Store<any>
    ) { }

  ngOnInit() {
    this.CategoryStore.dispatch( new ActionsFile.LoadDoctorCat());
  
    this.CategoryStore.subscribe(data =>{
      this.listDoctorCat = Object.values(data.DoctorCat.entities)  
      console.log(" this.listDoctorCat =  ",this.listDoctorCat) 
    })
  }
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  getContact(contact){
    this.contact = contact;
    console.log('Contact : ',contact);
  }

  getvalue(val){
    console.log('val : ',val)
    this.catId = val
  }

  addDoctor(){
    this.doctorForm.setControl('categoryId', new FormControl(this.catId));
    this.doctorForm.setControl('contactId', new FormControl(this.contact.id));
    this.doctorForm.setControl('contact', new FormControl(this.contact));

    console.log("Doctor : ",this.doctorForm.value)
  }

}