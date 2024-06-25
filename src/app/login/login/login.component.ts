import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IntroExcerptComponent } from '../../shared/components/intro-excerpt/intro-excerpt.component';
import {SharedModule} from "../../shared/shared.module";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    IntroExcerptComponent,
    ReactiveFormsModule,
    SharedModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginService) {
  }
  regex: string = '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{8,30}$';
  successfullySend: boolean = false;

  LoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.regex)]),
  });

  onSubmit(): void {
    if (this.LoginForm.valid) {
      let dataToSend = {
        email: this.email?.value,
        password: this.password?.value,
      };
      this.loginService.create(dataToSend).subscribe(response => {
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

  get password() {
    return this.LoginForm.get('password');
  }
}
