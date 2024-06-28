import {Component, OnInit} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {CartService} from "../../shared/services/cart.service";
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  constructor(
    private cartService: CartService,
    private authService: AuthService,
  ) {  }

  products: any[] = [];
  subtotal: number = 0;
  total: number = 0;
  delivery: number = 0;
  tokenExpired: boolean = false;
  token: string | null = this.authService.getToken();


  ngOnInit():void {
    this.authService.redirectToAdminPanel(this.token)

    if (this.token) {
      this.tokenExpired = this.authService.isTokenExpired(this.token);
    }

    this.getProducts()
  }

  getProducts(){
    this.cartService.getProductsInCart().subscribe({
      next: (data)=>{
        console.log(data.products)
        this.products = data.products;
        this.subtotal = parseInt(data.total_price, 10);
        this.delivery = this.subtotal > 100 ? 0 : 50;
        this.total = this.delivery + this.subtotal;
      },
      error: (err) =>{
        this.products = []
        console.log(this.products)
      }
    })
  }

  removeProductFromCart( id: number){
    console.log(id)
    this.cartService.delete(id).subscribe({
      next: data => {
        console.log(data)
        this.getProducts();
      }, error: err => {}
    })
  }

  increasePricing(increase :boolean, price :number){
    // this.subtotal = increase ? this.subtotal += price : this.subtotal -= price;
    // this.delivery = this.subtotal > 100 ? 0 : 50;
    // this.total = this.delivery + this.subtotal;
    // this.setPriceInLocalStorage(this.subtotal, this.total, this.delivery);
  }

  updateProductQuantity(productId:number, change: string){
    console.log(productId)
    console.log(change)
    let dataToSend = {
      'change' : change
    }
    this.cartService.update(productId, dataToSend).subscribe({
      next: data => {
        console.log(data)
        this.getProducts();
      }, error: err => {}
    })
  }


  setPriceInLocalStorage(subtotal: number, total: number, delivery: number){
    // localStorage.setItem('subtotalPrice', JSON.stringify(this.subtotal));
    // localStorage.setItem('totalPrice', JSON.stringify(this.total));
    // localStorage.setItem('delivery', JSON.stringify(this.delivery));
  }


    protected readonly localStorage = localStorage;
  protected readonly JSON = JSON;
}
