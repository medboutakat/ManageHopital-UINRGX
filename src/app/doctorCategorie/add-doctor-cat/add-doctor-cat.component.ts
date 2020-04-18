import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromDoctorCat from "src/app/doctors/doctorCategorie/Store/reducer";
import { doctorCat } from '../doctorCat.module';
import * as ActionsFile from 'src/app/doctors/doctorCategorie/Store/Action'

@Component({
  selector: 'add-doctor-cat',
  templateUrl: './add-doctor-cat.component.html',
  styleUrls: ['./add-doctor-cat.component.scss']
})
export class AddDoctorCatComponent implements OnInit {
  DoctorcAT: FormGroup;

  constructor( private fb: FormBuilder,
    private store: Store<fromDoctorCat.DoctorCatState>) {
    
   }

  ngOnInit() {
    this.DoctorcAT = this.fb.group({
      name: ["", Validators.required],
      remark: ["", Validators.required],
    });
  }
  reserve() {
    var newApp = this.DoctorcAT.value as doctorCat
    this.store.dispatch(new ActionsFile.CreateDoctorCat(newApp));
    this.DoctorcAT.reset();
    console.log("bien faite")
  }










}
