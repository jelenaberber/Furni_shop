import {Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItemCount: number = 0;
  cartItemCountChange: EventEmitter<number> = new EventEmitter<number>();

  get cartItemCount(): number {
    return this._cartItemCount;
  }

  set cartItemCount(count: number) {
    this._cartItemCount = count;
    this.cartItemCountChange.emit(this._cartItemCount);
    console.log('Updated cart item count in CartService:', this._cartItemCount);
  }
  constructor() {}
}
