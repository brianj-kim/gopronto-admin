import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router){}

  canActivate(): boolean {
    if(!this.auth.isAuthenticated()) {
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }
  
}
