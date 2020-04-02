import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { Observable } from 'rxjs';
import { HospitalCat } from 'src/app/HospitalCategorie/hospitalCat.model';
import * as ActionsFiles from 'src/app/hospital/store/Action'
import { MatBottomSheet, MatDialog } from '@angular/material';
import { HospitalEditComponent } from '../hospital-edit/hospital-edit.component';
import { DialogComponent } from 'src/app/appointements/dialog/dialog.component';

@Component({
  selector: 'app-hopital',
  templateUrl: './hopital.component.html',
  styleUrls: ['./hopital.component.css']
})
export class HopitalComponent implements OnInit {
  
  listhopitalCatValues: any; 
  listHopital: any;
  error$: Observable<String>;


  constructor(private store : Store<any>, private _bottomSheet: MatBottomSheet,public dialog: MatDialog) {
    this.store.dispatch( new ActionsFile.LoadHospitalCat());
    this.store.subscribe(data =>{  
      this.listhopitalCatValues = Object.values(data.HospitalCat.entities)  
      console.log(" this.listhopitalCatValues=> ",this.listhopitalCatValues)    
    }
    ),
    this.store.dispatch( new ActionsFiles.LoadHospital());
  
    this.store.subscribe(data =>{
      this.listHopital = Object.values(data.Hospital.entities) 
      console.log("list ; ",this.listHopital)
    })
  }
  ngOnInit() {
  }
  get hospitalcat(){
     return this.listhopitalCatValues;
  }

  openBottomSheet(): void {
    this._bottomSheet.open(HospitalEditComponent);
    console.log('show bottom sheet ...')
  }
  openDialog(data) {
    this.dialog.open(DialogComponent, { data })
  }
}
