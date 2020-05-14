import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { Auth } from '../auth';
import { AppState, selectAuthState } from '../store/app.state'
import { LogIn } from '../store/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }
  getState: Observable<any>;
  errorMessage: string | null;
  username1 = localStorage.getItem("username");
  password1 = localStorage.getItem("password");
  loginForm: FormGroup;
  ngOnInit() {
    this.loginForm = this.fb.group({
      'username': [this.username1, [Validators.required]],
      'password': [this.password1, Validators.required],
    });
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }
  test: boolean = false;
  Auth = new Auth
  login(formData: NgForm) {

    var payload = this.loginForm.value as Auth
    this.store.dispatch(new LogIn(payload)); 
    
  }
  
}
