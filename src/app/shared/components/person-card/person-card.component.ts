import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-person-card',
  standalone: true,
  imports: [],
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.css'
})
export class PersonCardComponent {

  @Input() name: string = '';
  @Input() alt: string = '';
  @Input() path: string = '';
  @Input() description: string = '';
}
