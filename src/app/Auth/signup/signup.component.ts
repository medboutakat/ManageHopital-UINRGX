import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Register } from '../register';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      'firstName': [null, [Validators.required]],
      'lastName': [null, Validators.required],
      'sexe': [null, Validators.required],
      'username': [null, [Validators.required]],
      'password': [null, Validators.required],
    });
  }

  Register() {
    var a = this.signupForm.value as Register;
    this.auth.register(a).subscribe(res => {
      localStorage.setItem("username", a.username);
      localStorage.setItem("password", a.password);
      this.router.navigate(['/signin']);
    })
  }
}
