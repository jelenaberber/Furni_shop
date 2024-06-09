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
  description: string = 'Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.';
}
