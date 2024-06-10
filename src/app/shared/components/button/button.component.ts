import {Component, Input,} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() color: string = "";
  @Input() title: string = "";
  @Input() cartIcon: boolean = false;
  @Input() link: string = "";
}
