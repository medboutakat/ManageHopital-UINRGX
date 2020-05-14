import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm, FormGroup } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';
import { Register } from './register';
import { Auth } from './auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "http://144.91.76.98:5002/api/Users/authenticate"
  url2 = "http://144.91.76.98:5002/api/Users/register"
  BASE_URL: any;


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient, private router: Router) { }


  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(username: string,  password: string): Observable<Auth> {
    console.log("service:login")
    const url = `${this.url}`;

    var body= { 
      "username" : username,
      "password":password
       }
   
    return this.http.post<Auth>(url, body);
  }

  signUp(payload: Register): Observable<Auth> {
    const url = `${this.url2}`;
    return this.http.post<Auth>(url, { payload });
  }
  getStatus(): Observable<Auth> {
    const url = `${this.url}`;
    return this.http.get<Auth>(url);
  }  
 
}
