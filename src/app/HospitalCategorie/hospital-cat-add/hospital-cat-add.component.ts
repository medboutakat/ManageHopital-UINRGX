import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef, MatBottomSheetRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { DialogComponent } from 'src/app/appointements/dialog/dialog.component';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { HospitalCatComponent } from '../hospital-cat/hospital-cat.component';
import { HospitalCat } from '../hospitalCat.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-hospital-cat-add',
  templateUrl: './hospital-cat-add.component.html',
  styleUrls: ['./hospital-cat-add.component.scss']
})
export class HospitalCatAddComponent implements OnInit {
  HospitalCatForm: FormGroup;

  addForm: FormGroup
  constructor( private store: Store<any>,
    private _bottomSheetRef: MatBottomSheetRef<HospitalCatComponent>,private fb: FormBuilder) { }

  ngOnInit() {
    this.HospitalCatForm = this.fb.group({
      name: ["", Validators.required],
      remark: ["", Validators.required],
    });
 
  }



   creHospitalCat() {
    var a =this.HospitalCatForm.value as HospitalCat
   this.store.dispatch(new ActionsFile.CreateHospitalCat(a));
    this.HospitalCatForm.reset();
    
}

}
