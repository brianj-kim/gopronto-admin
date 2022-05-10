import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication-service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private router: Router, private authService: AuthenticationService) {}

  isNavMenuOpen: boolean = false;

  toggle(): void {
    this.isNavMenuOpen = !this.isNavMenuOpen;
  }

  clickedOutside(): void {
    this.isNavMenuOpen = false;
  }

  navToggle(nav: string) {
    this.isNavMenuOpen = false;
    this.router.navigate([nav]);
  }
}

