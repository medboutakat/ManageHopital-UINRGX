import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Contact } from '../contact.model';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  fb:FormBuilder;
  newContact : Contact;
  contactFormControl:FormGroup = new FormGroup({
    id: new FormControl(''),
    phone1 : new FormControl(''),
    phone2 : new FormControl(''),  
    adress1: new FormControl(''),
    adress2: new FormControl(''),
    fax: new FormControl(''),
    cityId: new FormControl('')
  });

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  //for email mat-input
  matcher = new MyErrorStateMatcher();

  //output
  @Output() getOutputForm = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }

  Onclick(){
     this.contactFormControl.addControl('email', new FormControl(this.emailFormControl.value))
    this.getOutputForm.emit(this.contactFormControl.value);
  }

}
