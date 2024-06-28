import {Component, OnInit} from '@angular/core';
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
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

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
export class LoginComponent implements OnInit{

  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router: Router,) {
  }
  regex: string = '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{8,30}$';
  successfullySend: boolean = false;
  errorMessage: string | null = '';
  token: string | null = this.authService.getToken();

  ngOnInit() {
    if(this.token && !this.authService.isTokenExpired(this.token)){
      this.router.navigate(['/home']);
    }
  }

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
        let decodedToken = this.authService.decodeToken(response.authorisation.token);

        if(decodedToken.role_id != 2){
          window.location.href = '/home';
        }
        else{
          window.location.href = '/adminPanel';
        }
      }, error => {
        this.errorMessage = error.message;
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
