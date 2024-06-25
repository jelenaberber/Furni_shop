import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "../../login/login/services/login.service";
import {SharedModule} from "../../shared/shared.module";
import {RegisterService} from "./services/register.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule, SharedModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private registerService: RegisterService) {
  }
  regexPassword: string = '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{8,30}$';
  regex: string = '^(?=.*[A-Z])[A-Z][a-zA-Z]{2,19}( [A-Z][a-zA-Z]{2,19})?$';
  successfullySend: boolean = false;

  LoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.regexPassword)]),
    first_name: new FormControl('', [Validators.required, Validators.pattern(this.regex)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(this.regex)]),
    username: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    if (this.LoginForm.valid) {
      let dataToSend = {
        email: this.email?.value,
        password: this.password?.value,
        first_name: this.first_name?.value,
        last_name: this.last_name?.value,
        username: this.username?.value,
      };
      this.registerService.create(dataToSend).subscribe(response => {
        console.log('Success', response);
        const token = response.authorisation.token;
        localStorage.setItem('authToken', token);
        window.location.href = '/home';
      }, error => {
        console.error('Error', error);
      });
    } else {
      this.LoginForm.markAllAsTouched();
    }
  }

  get email() {
    return this.LoginForm.get('email');
  }

  get first_name() {
    return this.LoginForm.get('first_name');
  }

  get last_name() {
    return this.LoginForm.get('last_name');
  }

  get username() {
    return this.LoginForm.get('username');
  }

  get password() {
    return this.LoginForm.get('password');
  }
}
