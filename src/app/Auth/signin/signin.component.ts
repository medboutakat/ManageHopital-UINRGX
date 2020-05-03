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
  username1 = localStorage.getItem("username");
  password1 = localStorage.getItem("password");
  loginForm: FormGroup;
  ngOnInit() {
    this.loginForm = this.fb.group({
      'username': [this.username1, [Validators.required]],
      'password': [this.password1, Validators.required],
    });
  }
  test: boolean = false;
  login(formData: NgForm) {
    return this.auth.login(formData).subscribe(
      (user) => {
        if (user.id != null) {
          console.log("user", user);
          localStorage.setItem("user", user.username);
          this.router.navigate(['/home']);
        } else {
          console.log("erreur");
          this.test = true
        }


      });
  }

}
