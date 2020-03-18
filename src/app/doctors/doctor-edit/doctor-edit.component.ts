import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from 'src/app/contacts/contact/contact.component';

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
    {value: 'men-0', viewValue: 'Men'},
    {value: 'women-1', viewValue: 'Women'},
    {value: 'other-2', viewValue: 'Other'}
  ];

  constructor() { }

  ngOnInit() {
    
  }

}
