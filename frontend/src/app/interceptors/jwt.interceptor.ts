import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWT_NAME } from '../services/authentication-service/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: any = localStorage.getItem(JWT_NAME);

    if(token) {
      const clonedReq: any = request.clone({
        headers: request.headers.set('Authorization', 
        'Bearer ' + token)
      });

      console.log(clonedReq);
      return next.handle(clonedReq);
    } else {
      return next.handle(request);
    }    
  }
}
