import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './Auth/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

 

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService: AuthService;
  constructor(private injector: Injector) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.authService = this.injector.get(AuthService);
    const token: string = this.authService.getToken();  

    let json_blacklist = "Hospital/UpdateImages";
    let reqHeaders = {
        setHeaders: {
        'Content-Type' :  'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${ token }`,
        },
    };
   
    if(request.url.includes(json_blacklist)) {
        delete reqHeaders.setHeaders["Content-Type"];
    }

    request= request.clone(reqHeaders);

    return  next.handle(request);

  }
}


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private authService: AuthService;
    constructor(private injector: Injector) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authService = this.injector.get(AuthService);
        const token: string = this.authService.getToken();
      
        let json_blacklist = "Hospital/UpdateImages";
        let reqHeaders = {
            setHeaders: {
            'Content-Type' :  'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${ token }`,
            },
        };
       
        if(request.url.includes(json_blacklist)) {
            delete reqHeaders.setHeaders["Content-Type"];
        }
    
        request= request.clone(reqHeaders);
    
        return  next.handle(request);
        
    }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError((response: any) => {
                if (response instanceof HttpErrorResponse && response.status === 401) {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('/signin');
                }
                console.log("ErrorInterceptor : ",response)
                return Observable.throw(response);
            }));
    }
}