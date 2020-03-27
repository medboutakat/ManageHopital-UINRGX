import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  loginForm: FormGroup;
  ngOnInit() {
    this.loginForm = this.fb.group({
      'username': [null, [Validators.required]],
      'password': [null, Validators.required],
    });
  }
  login(formData: NgForm) {
    return this.auth.login(formData).subscribe(
      (user) => {
        console.log("user", user);
        console.log("user2", formData);
        console.log("connecter")
        this.router.navigate(['/home']);
      });
  }

}
