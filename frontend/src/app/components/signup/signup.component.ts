import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { map, pipe } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

class CustomValidators {
  static passwordContainsNumbers(control: AbstractControl): ValidationErrors {
    const regex = /\d/;

    if(regex.test(control.value) && control.value !== null) {
      return { passwordInvalid: false };
    } 
    return { passwordInvalid: true };    
  }

  static passwordsMatch(control: AbstractControl): ValidationErrors {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if((password === confirmPassword) && (password !== null && confirmPassword !== null)) {
      return { passwordsNotMatching: false };
    } else {
      return { passwordsNotMatching: true };
    }
  }
}
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
        CustomValidators.passwordContainsNumbers
      ]],
      confirmPassword: [null, [Validators.required]]
    }, { validators: [CustomValidators.passwordsMatch] });
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
