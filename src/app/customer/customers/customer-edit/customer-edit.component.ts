import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as CustomerActions from '../customer-store/action'
import { Customer } from '../customer.model';
import { ContactHelper } from 'src/app/contacts/contact.helper';
import { Contact } from 'src/app/contacts/contact.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss', "../../app-edit.component.scss"]
})
export class CustomerEditComponent implements OnInit {



  cities
  _currentObject: Customer;
  title: any;
  dialogref;
  customerForm: FormGroup;
  contactForm: FormGroup;
  _currentContactObject: Contact;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) data, private store: Store, private dialog: MatDialog) {

    this._currentObject = data._currentObject;
    if (this._currentObject == null)
      this._currentObject = new Customer();

    this._currentContactObject = this._currentObject.contactModel == null ? new Contact() : this._currentContactObject;

    this.title = data.title;
    console.log("current Object: ", this._currentObject);
  }

  ngOnInit() {

    this.contactForm = ContactHelper.getFormBuilder(this.fb, this._currentContactObject);

    this.customerForm = this.fb.group({
      id: new FormControl(this._currentObject.id, Validators.required),
      firstName: new FormControl(this._currentObject.firstName, Validators.required),
      lastName: new FormControl(this._currentObject.lastName, Validators.required),
      sexe: new FormControl(this._currentObject.sexe, Validators.required),
      contactForm: this.contactForm
    });


  }


  reserve() {

    console.log("docForm", this.customerForm.value);// use this "Added by Mohamed"
    var newApp = this.customerForm.value

    console.log("objet contact", newApp)
    if (newApp.id == environment.EmptyGuid) {
      console.log("Add")
      this.store.dispatch(new CustomerActions.Create(newApp));
      console.log("contact", newApp)

    }
    else {
      console.log("Update")
      console.log("id new app", newApp.id)
      this.store.dispatch(new CustomerActions.Update(newApp));
    }
    this.customerForm.reset();
    console.log("success")
    this.dialog.closeAll();
  }



}