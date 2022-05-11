import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
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
  profileImage?: string;
  // passwordConfirm?: string;
};

export const JWT_NAME = 'pronto-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  signup(user: User) {
    return this.http.post<any>('/backend/users/', user).pipe(
      map((user) => user)
    )

  }

  signin(signinForm: SigninForm) {
    return this.http.post<any>('backend/users/signin', { email: signinForm.email, password: signinForm.password }).pipe(
      map((token) => {
        // console.log(token);
        localStorage.setItem(JWT_NAME, token.access_token);
        return token;
      })
    );
  }

  isAuthenticated(): boolean {
    const token: string | any = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserId(): Observable<number> {
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt: string | any) => of(this.jwtHelper.decodeToken(jwt)).pipe(
        tap((jwt) => console.log(jwt)),
        map((jwt: string | any) => jwt.user.id)
      )
      
    ));
  }
}
