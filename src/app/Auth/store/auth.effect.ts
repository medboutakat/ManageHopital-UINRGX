import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure, SignUp, SignUpSuccess, SignUpFailure, GetStatus } from './auth.actions';
import { map, mergeMap, catchError, tap, switchMap } from "rxjs/operators";


@Injectable()
export class AuthEffects {
 
    constructor(
        private  actions$: Actions,
        private authService: AuthService,
        private router: Router,
    ) { }

    /*********************Login In***************************************** */

    @Effect()
    LogIn$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN),
        map((action: LogIn) => action.payload),
        mergeMap((payload : any )=>
        this.authService.logIn(payload.username, payload.password).pipe(
            map(
                (user)=>{
                     console.log("user",user);
                     return new LogInSuccess(user);
                }                    
            ),
            catchError(err =>of(new LogInFailure(err)))
        )
        )
    );
    
    @Effect({ dispatch: false })
    LogInSuccess$: Observable<any> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((user) => {
            console.log("yes")
            localStorage.setItem('token', user.payload.token);
            this.router.navigateByUrl('/');
        })
    );
    @Effect({ dispatch: false })
    LogInFailure$: Observable<any> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
    );
    
    
     

    /*************************SignUp********************************** */
    @Effect()
    SignUp$: Observable<any> = this.actions$.pipe(
        ofType(AuthActionTypes.SIGNUP)).pipe(
            map((action: SignUp) => action.payload),
            switchMap(payload => {
                return this.authService.signUp(payload),
                    map((user) => {
                        console.log(user);
                        return new SignUpSuccess(user);
                    }),
                    catchError(err => of(new SignUpFailure(err)));
            }))

    @Effect({ dispatch: false })
    SignUpSuccess$: Observable<any> = this.actions$.pipe(
        ofType(AuthActionTypes.SIGNUP_SUCCESS),
        tap((user) => {
            localStorage.setItem('token', user.payload.token);
            this.router.navigateByUrl('/');
        })
    );
    @Effect({ dispatch: false })
    SignUpFailure$: Observable<any> = this.actions$.pipe(
        ofType(AuthActionTypes.SIGNUP_FAILURE)
    );

    /**********************log out*************************** */
    @Effect({ dispatch: false })
    public LogOut: Observable<any> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap((user) => {
            localStorage.removeItem('token');
        })
    );
    /**************************get Status************************************ */
    @Effect({ dispatch: false })
    GetStatus$: Observable<any> = this.actions$.pipe(
        ofType(AuthActionTypes.GET_STATUS)).pipe(
            map((action: GetStatus) => action),
            switchMap(payload => {
                return this.authService.getStatus();
            }));

}