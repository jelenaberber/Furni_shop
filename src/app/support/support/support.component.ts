import {Component, OnInit} from '@angular/core';
import {SupportService} from "./services/support.service";
import {IService} from "../../shared/interfaces/i-service";
import {SharedModule} from "../../shared/shared.module";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent implements OnInit{

  constructor(
    private supportService: SupportService,
    private authService: AuthService,
  ) {
  }

  supports: IService[] = [];
  token: string | null = this.authService.getToken();

  ngOnInit() {
    this.authService.redirectToAdminPanel(this.token)
    this.supportService.getAll().subscribe({
      next: (data)=>{
        console.log(data)
        this.supports = data;
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }
}
