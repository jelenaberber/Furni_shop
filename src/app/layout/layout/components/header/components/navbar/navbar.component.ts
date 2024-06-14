import {Component, OnInit, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { SharedModule } from "../../../../../../shared/shared.module";
import { CartService } from "../../../../../../shared/services/cart.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    SharedModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItemCount: number = 0;
  private subscription: Subscription = new Subscription();
  constructor(
    private cartService: CartService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription = this.cartService.cartItemCount$.subscribe(
      count => {
        this.cartItemCount = count;
        console.log('NavbarComponent: Updated cart item count to', this.cartItemCount);
        this.cdRef.detectChanges();
      }
    );
  }
}
