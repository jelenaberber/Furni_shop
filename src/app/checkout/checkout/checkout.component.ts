import {Component, OnInit} from '@angular/core';
import {IntroExcerptComponent} from "../../shared/components/intro-excerpt/intro-excerpt.component";
import {SharedModule} from "../../shared/shared.module";
import {Router, RouterModule} from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {ErrorStateMatcher} from "@angular/material/core";
import {RouterLink} from "@angular/router";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    IntroExcerptComponent,
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent{
  constructor(private router: Router) {}

  totalPrice: string | null = localStorage.getItem("totalPrice");
  subtotalPrice: string | null = localStorage.getItem("subtotalPrice");
  delivery: string | null = localStorage.getItem("delivery");
  regex: string = '^(?=.*[A-Z])[A-Z][a-zA-Z]{2,19}( [A-Z][a-zA-Z]{2,19})?$';
  regexAddress: string = '^[A-Z][a-zA-Z]{0,14}( [A-Z][a-zA-Z]{0,14})? [0-9]{1,4}$';

  billingForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required, Validators.pattern(this.regex)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(this.regex)]),
    city: new FormControl('', [Validators.required, Validators.pattern(this.regex)]),
    address: new FormControl('', [Validators.required, Validators.pattern(this.regexAddress)]),
    zipCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]),
  });

  onSubmit(): void {
    if (this.billingForm.valid) {
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("subtotalPrice");
      localStorage.removeItem("delivery");
      localStorage.removeItem("cartItems");
      this.router.navigate(['/thankYou']);
    } else {
      this.billingForm.markAllAsTouched();
    }
  }


}
