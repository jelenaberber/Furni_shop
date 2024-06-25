import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ContactService } from './services/contact.service';
import { AuthService } from '../../shared/services/auth.service';
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  successfullySend: boolean = false;
  emailExistInToken: string | null = null;
  token: string | null = this.authService.getToken();

  constructor(private fb: FormBuilder, private contactService: ContactService, private authService: AuthService) {
    this.contactForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    if (this.token) {
      const decodedToken = this.authService.decodeToken(this.token);
      if (decodedToken && decodedToken.email) {
        this.emailExistInToken = decodedToken.email;
        this.contactForm.patchValue({ email: this.emailExistInToken });
      }
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      let dataToSend = {
        email: this.contactForm.value.email,
        message: this.contactForm.value.message
      };
      this.contactService.create(dataToSend).subscribe(response => {
        this.contactForm.reset();
        this.successfullySend = true;
      }, error => {
        console.error('Error', error);
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }
}
