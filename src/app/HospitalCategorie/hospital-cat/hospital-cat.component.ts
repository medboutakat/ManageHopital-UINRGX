import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { DialogComponent } from 'src/app/appointements/dialog/dialog.component';
import { MatDialog, MatBottomSheetRef, MatBottomSheet } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromHospitalCat from "src/app/HospitalCategorie/Store/reducer";
import { HospitalCat } from '../hospitalCat.model';
import { HospitalCatAddComponent } from '../hospital-cat-add/hospital-cat-add.component';

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
   
  }
  openDialog(data) {
    this.dialog.open(DialogComponent, { data })
  }

<<<<<<< HEAD
=======
   creHospitalCat() {
    var a =this.HospitalCatForm.value as HospitalCat
    this.store.dispatch(new ActionsFile.CreateHospitalCat(a));
    this.store.dispatch( new ActionsFile.LoadHospitalCat());
    this.HospitalCatForm.reset();
    
}

>>>>>>> 86a53aed2b4834e329884e73d3796dcd81eb8a76
deleteCustomer(hospital: HospitalCat) {
  if (confirm("Are You Sure You want to Delete the User?")) {
    this.store.dispatch(new ActionsFile.DeleteHospitalCat(hospital.id));
    this.store.dispatch( new ActionsFile.LoadHospitalCat());
  }
}

add() {
  console.log("hello");
  this.dialog.open(HospitalCatAddComponent);
}
}
