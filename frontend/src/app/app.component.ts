import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private router: Router) {}

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

