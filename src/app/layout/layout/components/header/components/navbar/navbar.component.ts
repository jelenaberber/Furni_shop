import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SharedModule} from "../../../../../../shared/shared.module";
import {CartService} from "../../../../../../shared/services/cart.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    SharedModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  cartItemCount: number = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.cartItemCountChange.subscribe((count: number) => {
      this.cartItemCount = count;
      console.log('Updated cart item count in NavbarComponent:', this.cartItemCount);
    });

    this.cartItemCount = this.cartService.cartItemCount;
    console.log('NavbarComponent:', this.cartItemCount);
  }


}
