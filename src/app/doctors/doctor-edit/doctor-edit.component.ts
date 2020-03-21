import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from 'src/app/contacts/contact/contact.component';
import { MatBottomSheetRef } from '@angular/material';
import { DoctorComponent } from '../doctor/doctor.component';

interface Sexe {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.scss']
})
export class DoctorEditComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  genders:Sexe[] = [
    {value: 'men', viewValue: 'Men'},
    {value: 'women', viewValue: 'Women'},
    {value: 'other', viewValue: 'Other'}
  ];

  constructor(private _bottomSheetRef: MatBottomSheetRef<DoctorComponent>) { }

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