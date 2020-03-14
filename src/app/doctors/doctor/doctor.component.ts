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

  doctors$: Observable<Doctor[]>;
  error$: Observable<String>;

  constructor(private store: Store<fromDoctorReducer.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new doctorActions.getDoctor());
    this.doctors$ = this.store.pipe(select(fromDoctorReducer.getDoctors));
    // this.error$ = this.store.pipe(select(fromDoctorReducer.getError));
    console.log(this.doctors$)
  }

}
