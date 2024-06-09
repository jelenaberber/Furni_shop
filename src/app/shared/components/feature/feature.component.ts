import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css'
})
export class FeatureComponent {
  @Input() title: string = '';
  @Input() img: string = '';
  @Input() description: string = '';
}
