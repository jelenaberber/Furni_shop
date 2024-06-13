import {Component, input, Input} from '@angular/core';
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-intro-excerpt',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './intro-excerpt.component.html',
  styleUrl: './intro-excerpt.component.css'
})
export class IntroExcerptComponent {
  @Input() title: string = "";
  @Input() titleSpan: string = "";
  @Input() shopPage: boolean = false;
  description: string = 'At Furni, we believe that your home should reflect your personality and lifestyle. Our personalized design services are tailored to meet your unique needs and preferences.';
}
