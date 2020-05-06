import { Injectable } from '@angular/core';
import {  HttpEvent,  HttpHandler,  HttpInterceptor,  HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; 
 

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 

  
    return next.handle(request);
     
  }
}