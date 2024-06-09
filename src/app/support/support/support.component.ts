import {Component, OnInit} from '@angular/core';
import {SupportService} from "./services/support.service";
import {IService} from "../../shared/interfaces/i-service";
import {SharedModule} from "../../shared/shared.module";

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent implements OnInit{

  constructor(
    private supportService: SupportService
  ) {
  }

  supports: IService[] = [];
  ngOnInit() {
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
