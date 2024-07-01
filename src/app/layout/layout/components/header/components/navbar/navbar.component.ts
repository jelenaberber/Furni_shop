import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from "@angular/router";
import { SharedModule } from "../../../../../../shared/shared.module";
import { CartService } from "../../../../../../shared/services/cart.service";
import { AuthService } from "../../../../../../shared/services/auth.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    SharedModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.token$.subscribe(token => {
      this.isLoggedIn = !!token && !this.authService.isTokenExpired(token);
      if (this.isLoggedIn && token) {
        const decodedToken = this.authService.decodeToken(token);
        this.isAdmin = decodedToken.role_id === 2;
      } else {
        this.isAdmin = false;
      }
      this.cdRef.detectChanges();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }
}
