import {Component, OnInit} from '@angular/core';
import{FeatureComponent} from "../feature/feature.component";
import {ChooseUsService} from "../../services/choose-us.service";

@Component({
  selector: 'app-choose-us',
  standalone: true,
  imports: [
    FeatureComponent
  ],
  templateUrl: './choose-us.component.html',
  styleUrl: './choose-us.component.css'
})
export class ChooseUsComponent implements OnInit{

  constructor(
    private chooseUsService: ChooseUsService,
  ) {
  }

  chooseUs:any = []
  ngOnInit():void {
    this.chooseUsService.getAll().subscribe({
      next: (data)=>{
        console.log(data)
        this.chooseUs = data.splice(0,4);
      }
    })
  }
}
