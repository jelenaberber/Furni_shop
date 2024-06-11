import { Component } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {CommonModule} from "@angular/common";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  regex: string = '^(?=.*[A-Z])[A-Z][a-zA-Z]{2,19}( [A-Z][a-zA-Z]{2,19})?$';
  successfullySend : boolean = false;

  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required, Validators.pattern(this.regex)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(this.regex)]),
    message: new FormControl('', Validators.required)
    });

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.successfullySend = true;
      this.contactForm.reset();
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)!.markAsUntouched();
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

}
