import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { HopitalComponent } from '../hopital/hopital.component';
import { MyErrorStateMatcher } from 'src/app/contacts/contact/contact.component';
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'



interface Sexe {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-hospital-edit',
  templateUrl: './hospital-edit.component.html',
  styleUrls: ['./hospital-edit.component.scss']
})



export class HospitalEditComponent implements OnInit {
  
  matcher = new MyErrorStateMatcher();

  genders:Sexe[] = [
    {value: 'men', viewValue: 'Men'},
    {value: 'women', viewValue: 'Women'},
    {value: 'other', viewValue: 'Other'}
  ];
  listhopitalCatValues: unknown[];

  constructor(private _bottomSheetRef: MatBottomSheetRef<HopitalComponent>,private store : Store<any>,) { 
    this.store.dispatch( new ActionsFile.LoadHospitalCat());
    this.store.subscribe(data =>{  
      this.listhopitalCatValues = Object.values(data.HospitalCat.entities)  
      console.log(" this.listhopitalCatValues=> ",this.listhopitalCatValues)    
    }
    )
  }

  ngOnInit() {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  getContact(contact){
    console.log('Contact : ',contact);
  }


}
