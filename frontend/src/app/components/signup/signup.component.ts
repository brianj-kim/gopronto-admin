import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, pipe } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(3),
        // CustomValidators.passwordContainsNumbers
      ]],
      passwordConfirm: [null, [Validators.required]]
    }, {
      // Validators: CustomValidators.passwordMatches
    })
  }

  onSubmit() {
    if(this.signupForm.invalid) {
      return;
    }

    console.log(this.signupForm.value);
    this.authService.signup(this.signupForm.value).pipe(
      map((user) => this.router.navigate(['signin']))      
    ).subscribe();

  }
}
