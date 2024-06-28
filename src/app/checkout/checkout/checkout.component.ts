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
import {OrderService} from "./services/order.service";
import {CartService} from "../../shared/services/cart.service";
import {AuthService} from "../../shared/services/auth.service";

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
export class CheckoutComponent implements OnInit{
  constructor(private router: Router,
              private orderService:OrderService,
              private cartService:CartService,
              private authService: AuthService,) {}

  totalPrice: number = 0;
  subtotalPrice: number = 0;
  delivery: number = 0;
  regex: string = '^(?=.*[A-Z])[A-Z][a-zA-Z]{2,19}( [A-Z][a-zA-Z]{2,19})?$';
  regexAddress: string = '^[A-Z][a-zA-Z]{0,14}( [A-Z][a-zA-Z]{0,14})? [0-9]{1,4}$';
  token: string|null = this.authService.getToken();

  ngOnInit() {
    this.authService.redirectToAdminPanel(this.token)

    this.cartService.getProductsInCart().subscribe({
      next: results => {
        this.subtotalPrice = results.total_price;
        this.delivery = results.totalPrice > 100 ? 0 : 50;
        this.totalPrice = this.subtotalPrice + this.delivery;
      },
      error: error => {
        console.log(error)
      }
    })
  }

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
      let dataToSend = {
        first_name: this.billingForm.get('firstName')?.value,
        last_name: this.billingForm.get('lastName')?.value,
        city: this.billingForm.get('city')?.value,
        address: this.billingForm.get('address')?.value,
        zip_code: this.billingForm.get('zipCode')?.value,
        phone: this.billingForm.get('phone')?.value,
        email: this.billingForm.get('email')?.value
      };
      this.orderService.createWithToken(dataToSend).subscribe(response => {
        this.router.navigate(['/thankYou']);
      }, error => {
        console.error('Error', error);
      });
    } else {
      this.billingForm.markAllAsTouched();
    }
  }

  get firstName() {
    return this.billingForm.get('firstName');
  }

  get lastName() {
    return this.billingForm.get('lastName');
  }

  get city() {
    return this.billingForm.get('city');
  }

  get address() {
    return this.billingForm.get('address');
  }

  get zipCode() {
    return this.billingForm.get('zipCode');
  }

  get phone() {
    return this.billingForm.get('phone');
  }

  get email() {
    return this.billingForm.get('email');
  }
}
