import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { DoctorComponent } from '../doctor/doctor.component';
import { Store } from '@ngrx/store';

import * as ActionsFile from 'src/app/doctors/doctorCategorie/Store/Action';
import { doctorCat } from '../doctorCategorie/doctorCat.module';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Contact } from 'src/app/contacts/contact.model';
import * as citiesActions from 'src/app/cities/store/city.actions'

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.scss']
})
export class DoctorEditComponent implements OnInit {



  cities
  constructor() { }

  ngOnInit() {

  }
  contact
  getContact(contact) {
    this.contact = contact;
    console.log('Contact : ', this.contact);
  }




}