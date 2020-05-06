import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm, FormGroup } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';
import { Register } from './register';
import { User } from './auth';
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
  register(user: Register) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      id: user.id, firstName: user.firstName, lastname: user.lastName,
      sexe: user.sexe, username: user.username, password: user.password,
    }
    return this.http.post<Register>(this.url2, body, { headers })
  }

  login(formData: NgForm) {
    return this.http.post<any>(`${this.url}`, formData).pipe(
      tap(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

      }),
      catchError(this.handleError('login', []))
    );
  }

  logout() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/home']);
    }
  }

  isloggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
  }

  getUser() {
    if (this.isloggedIn) {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  getStatus(): Observable<User> {
    const url = `${this.BASE_URL}/status`;
    return this.http.get<User>(url);
  }
}
