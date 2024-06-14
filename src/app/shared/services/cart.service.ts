import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor() {
    this.updateCartItemCount();
    window.addEventListener('storage', (event) => {
      if (event.key === 'cartItems') {
        this.updateCartItemCount();
      }
    });
  }

  private updateCartItemCount(): void {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const itemCount = cartItems.length;
    this.cartItemCountSubject.next(itemCount);
  }

}
