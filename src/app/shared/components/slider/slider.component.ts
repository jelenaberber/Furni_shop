import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {TestimonialsService} from "../../services/testimonials.service";
import {ITestimonials} from "../../interfaces/i-testimonials";

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit{

  constructor(
    private testimonialsService:TestimonialsService,
  ) {
  }

  testimonials: ITestimonials[] = [];
  ngOnInit() {
    this.testimonialsService.getAll().subscribe({
      next: (data)=>{
        console.log(data)
        this.testimonials = data;
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }
}
