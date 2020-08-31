import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.tokenIsPresent()) {
        console.log("Token is present.");
        request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${this.auth.getToken()}`
        }
        });
    }else{
      console.log("Token is not present.");
    }
    return next.handle(request);
  }
}