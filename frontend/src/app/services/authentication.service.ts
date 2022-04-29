import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>('backend/users/login', { email, password }).pipe(
      map((token) => {
        console.log(token);
        localStorage.setItem('pronto-token', token.access_token);
        return token;
      })
    );
  }
}
