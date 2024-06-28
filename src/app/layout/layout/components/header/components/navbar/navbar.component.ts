import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from "@angular/router";
import { SharedModule } from "../../../../../../shared/shared.module";
import { CartService } from "../../../../../../shared/services/cart.service";
import { AuthService } from "../../../../../../shared/services/auth.service";

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
  isLoggedIn: boolean = false;
  token: string | null = this.authService.getToken();
  decodedToken: any = '';
  tokenExpired: boolean = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.token$.subscribe(token => {
      this.isLoggedIn = !!token && !this.authService.isTokenExpired(token);
      this.cdRef.detectChanges();
    });
    if(this.token){
      this.cartService.getProductsInCart().subscribe({
        next: data => {
          this.cartItemCount = data.products.length;
        },
        error: error => {
          console.log(error)
        }
      })
      this.decodedToken = this.authService.decodeToken(this.token)
      this.tokenExpired = this.authService.isTokenExpired(this.token)
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }
}
