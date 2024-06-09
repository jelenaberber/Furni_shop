import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {TeamService} from "./services/team.service";
import {ITeamMember} from "../../shared/interfaces/i-team-member";

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
  ) { }

  team: ITeamMember[] = [];
  ngOnInit():void {
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
