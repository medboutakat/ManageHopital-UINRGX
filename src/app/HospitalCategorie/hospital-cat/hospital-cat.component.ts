import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { DialogComponent } from 'src/app/appointements/dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromHospitalCat from "src/app/HospitalCategorie/Store/reducer";
import { HospitalCat } from '../hospitalCat.model';

@Component({
  selector: 'app-hospital-cat',
  templateUrl: './hospital-cat.component.html',
  styleUrls: ['./hospital-cat.component.css']
})
export class HospitalCatComponent implements OnInit {
  listhopitalCatValues: any; 
  HospitalCatForm: FormGroup;

  constructor(private store : Store<any>,public dialog: MatDialog,private fb: FormBuilder,) {
    this.store.dispatch( new ActionsFile.LoadHospitalCat());
  
    this.store.subscribe(data =>{  
      this.listhopitalCatValues = Object.values(data.HospitalCat.entities)  
      console.log(" this.listhopitalCatValues=> ",this.listhopitalCatValues) 
    
    }
    )
  } 
  
  ngOnInit() {
    this.HospitalCatForm = this.fb.group({
      name: ["", Validators.required],
      remark: ["", Validators.required],
    });
 
  }
  openDialog(data) {
    this.dialog.open(DialogComponent, { data })
  }

   creHospitalCat() {
    var a =this.HospitalCatForm.value as HospitalCat
   this.store.dispatch(new ActionsFile.CreateHospitalCat(a));
    this.HospitalCatForm.reset();
    
}

deleteCustomer(hospital: HospitalCat) {
  if (confirm("Are You Sure You want to Delete the User?")) {
    this.store.dispatch(new ActionsFile.DeleteHospitalCat(hospital.id));
  }
}

}
