import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Contact } from '../contact.model';
import { Store } from '@ngrx/store';
import * as citiesActions from 'src/app/cities/store/city.actions'
import * as contactActions from '../store/contact.actions'
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  fb: FormBuilder;
  showSave: boolean;
  contactFormControl: FormGroup = new FormGroup({
    email: new FormControl(''),
    phone1: new FormControl(''),
    adress1: new FormControl(''),
    cityId: new FormControl(''),
    phone2: new FormControl(''),
    fax: new FormControl(''),
    adress2: new FormControl(''),
    whatsApp: new FormControl('')
  });




  //output
  @Output() getOutputForm = new EventEmitter();

  cities
  @Input() visible = false
  constructor(
    private store: Store<any>, private service: ContactService
  ) {
    this.store.dispatch(new citiesActions.LoadCities());
    this.store.subscribe(res => {
      this.cities = res.cities.Cities
      console.log("cities", this.cities)
    })
  }

  ngOnInit() {
    this.showSave = true;
  }

  Onclick() {

    this.showSave = false;
    var a = this.contactFormControl.value as Contact
    console.log("objet contact 2", a);
    this.getOutputForm.emit(a);

  }

}
