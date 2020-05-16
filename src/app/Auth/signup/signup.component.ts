import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

import { Register } from '../register.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactHelper } from 'src/app/contacts/contact.helper';
import { Contact } from 'src/app/contacts/contact.model';
import { environment } from 'src/environments/environment';
import { AppState } from '../store/app.state'
import { Store } from '@ngrx/store';
import { SignUp } from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup
  contactForm: FormGroup;
  _currentContactObject: Contact;
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit() {

    this.contactForm = this.fb.group({
      id: new FormControl(environment.EmptyGuid),
      email: new FormControl(''),
      phone1: new FormControl(''),
      phone2: new FormControl(''),
      whatsApp: new FormControl(''),
      fax: new FormControl(''),
      adress1: new FormControl(''),
      adress2: new FormControl(''),
      cityId: new FormControl(''),
    })
    this.signupForm = this.fb.group({
      id: new FormControl(environment.EmptyGuid),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      sexe: new FormControl(''),
      userType: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      contactModel: this.contactForm
    });

  }

  Register() {
    var payload = this.signupForm.value as Register
    this.store.dispatch(new SignUp(payload));
  }
}
