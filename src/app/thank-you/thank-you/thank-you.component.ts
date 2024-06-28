import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css'
})
export class ThankYouComponent implements OnInit{
  constructor(private authService: AuthService,) {
  }

  token: string | null = this.authService.getToken();

  ngOnInit() {
    this.authService.redirectToAdminPanel(this.token)
  }
}
