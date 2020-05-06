import { Injectable } from '@angular/core';
import {  HttpEvent,  HttpHandler,  HttpInterceptor,  HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { catch } 'rxjs/add/operator/catch';

import 'rxjs/add/operator/catch';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    

  
    return next.handle(request)
      // .catch((response: any) => {
      //   if (response instanceof HttpErrorResponse && response.status === 401) {
      //     localStorage.removeItem('token');
      //     this.router.navigateByUrl('/log-in');
      //   }
      //   return Observable.throw(response);
      // });
;
  }
}