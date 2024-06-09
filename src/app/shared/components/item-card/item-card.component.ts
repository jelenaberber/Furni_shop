import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {

  @Input() name: string = '';
  @Input() img: string = '';
  @Input() price: number = 0;
  @Input() id: number = 0;
  @Output() addToCartClicked: EventEmitter<number> = new EventEmitter<number>();

  addToCart(): void {
    this.addToCartClicked.emit(this.id);
  }

}
