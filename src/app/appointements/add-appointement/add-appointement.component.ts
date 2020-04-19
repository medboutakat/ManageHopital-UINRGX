import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actionApps from '../store/hospital.actions'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Appointement } from '../appointement.model';
import * as appsAction from '../store/appointement.actions'

@Component({
  selector: 'app-add-appointement',
  templateUrl: './add-appointement.component.html',
  styleUrls: ['./add-appointement.component.scss']
})
export class AddAppointementComponent implements OnInit {
  apps
  addForm: FormGroup
  constructor(private store: Store<any>, private fb: FormBuilder) {
    this.store.dispatch(new actionApps.LoadHospitals());
   
    this.store.subscribe(data =>{  
      this.apps = Object.values(data.Hospital.entities)  
      console.log(" this.listhopital=> ",this.apps)
    })
  }

  ngOnInit() {
    this.addForm = this.fb.group({
      'identityNo': [null, [Validators.required]],
      'assurance': [null, Validators.required],
      'subject': [null, Validators.required],
      'reservationTimeStamp': [null, [Validators.required]],
      'hospitalId': [null, Validators.required],
    });
  }

  reserve() {
    var newApp = this.addForm.value as Appointement
    this.store.dispatch(new appsAction.CreateAppointement(newApp));
    this.addForm.reset();
    console.log("bien faite")
  }
}
