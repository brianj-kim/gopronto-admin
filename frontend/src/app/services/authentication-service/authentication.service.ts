import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

export interface SigninForm {
  email: string;
  password: string;
};

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  // passwordConfirm?: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  signup(user: User) {
    return this.http.post<any>('/backend/users/', user).pipe(
      map((user) => user)
    )

  }

  signin(signinForm: SigninForm) {
    return this.http.post<any>('backend/users/signin', { email: signinForm.email, password: signinForm.password }).pipe(
      map((token) => {
        console.log(token);
        localStorage.setItem('pronto-token', token.access_token);
        return token;
      })
    );
  }
}
