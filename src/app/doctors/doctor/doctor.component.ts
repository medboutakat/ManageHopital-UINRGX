import { Component, OnInit } from '@angular/core';

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import * as doctorActions from "../doctor-store/doctor.action";
import * as fromDoctorReducer from "../doctor-store/doctor.reducer";
import { Doctor } from '../doctor.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctors: Doctor[];
  error$: Observable<String>;

  constructor(private store: Store<fromDoctorReducer.AppSate>) { }

  ngOnInit() {
    this.store.dispatch( new doctorActions.getDoctor());
  
    this.store.subscribe(data =>{
      this.doctors = data.doctors.doctors
      // console.log(data.todos)
      console.log("list ; ",this.doctors)
    })
    console.log(this.doctors)
  }

}
