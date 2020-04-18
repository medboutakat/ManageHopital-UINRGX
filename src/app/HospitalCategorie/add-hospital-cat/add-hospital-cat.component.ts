import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as fromHospitalCat from "src/app/HospitalCategorie/Store/reducer";
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { HospitalCat } from '../hospitalCat.model';

@Component({
  selector: 'add-hospital-cat',
  templateUrl: './add-hospital-cat.component.html',
  styleUrls: ['./add-hospital-cat.component.scss']
})
export class AddHospitalCatComponent implements OnInit {

  HospitalCat: FormGroup;

  constructor( private fb: FormBuilder,
    private store: Store<fromHospitalCat.HospitalCatState>) {
    
   }
  ngOnInit() {
    this.HospitalCat = this.fb.group({
      name: ["", Validators.required],
      remark: ["", Validators.required],
    });
  }

  reserve() {
    var newApp = this.HospitalCat.value as HospitalCat
    this.store.dispatch(new ActionsFile.CreateHospitalCat(newApp));
    this.HospitalCat.reset();
    console.log("bien faite")
    
  }
}
