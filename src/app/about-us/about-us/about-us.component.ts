import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {TeamService} from "./services/team.service";
import {ITeamMember} from "../../shared/interfaces/i-team-member";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements OnInit{

  constructor(
    private teamService: TeamService,
    private authService: AuthService,
  ) { }

  token: string|null = this.authService.getToken();
  team: ITeamMember[] = [];

  ngOnInit():void {
    this.authService.redirectToAdminPanel(this.token)
    this.teamService.getAll().subscribe({
      next: (data)=>{
        this.team = data;
      },
      error: (err) =>{
        console.log(err)
    }
    });
  }
}
