import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

import { Register } from '../register';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactHelper } from 'src/app/contacts/contact.helper';
import { Contact } from 'src/app/contacts/contact.model';

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
    private router: Router) { }

  ngOnInit() {

    this.contactForm = this.fb.group({
      id: new FormControl(''),
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
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      sexe: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      contactModel: this.contactForm
    });

  }

  Register() {
    var a = this.signupForm.value
    console.log("user", a)
    this.auth.register(a).subscribe(res => {
      // localStorage.setItem("username", a.username);
      // localStorage.setItem("password", a.password);
      // this.router.navigate(['/signin']);
      console.log("bien faite")
    })
  }
}
