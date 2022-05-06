import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  signinForm!: FormGroup;

  constructor( private authService: AuthenticationService, private router: Router) { }
  
  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    })
  }

  onSubmit() {
    if(this.signinForm.invalid) {
      return;
    }
    this.authService.signin(this.signinForm.value).pipe(
      map((token) => this.router.navigate(['admin']))
    ).subscribe();
  }

}
