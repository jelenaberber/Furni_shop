import {Component, OnInit, Inject, SimpleChanges} from '@angular/core';
import {ProductsInCartService} from "./services/products-in-cart.service";
import {IProduct} from "../../shared/interfaces/i-product";
import {SharedModule} from "../../shared/shared.module";
import {filter} from "rxjs";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  constructor(
    private productsInCartService: ProductsInCartService,
  ) {  }


  idsOfProductsInCart: any = localStorage.getItem('cartItems');
  uniqueProducts:any = [...new Set(this.idsOfProductsInCart)];
  idArray: number[] = JSON.parse(this.idsOfProductsInCart);

  products: any[] = [];
  subtotal: number = 0;
  total: number = 0;
  delivery: number = 0;

  ngOnInit():void {
    console.log(localStorage.getItem('cartItems'));
    if (this.idsOfProductsInCart) {
      this.productsInCartService.getAll().subscribe({
        next: (data)=>{
          for(let product of data){
            for(let id of this.uniqueProducts){
              if(id == product.id){
                product.quantity = this.idArray.filter((id: any) => id === product.id).length;
                this.products.push(product);
                this.subtotal += product.price*product.quantity;
              }
            }
          }
          console.log(this.products)
          this.delivery = this.subtotal > 100 ? 0 : 50;
          this.total = this.delivery + this.subtotal;
          this.setPriceInLocalStorage(this.subtotal, this.total, this.delivery);
        },
        error: (err) =>{
          console.log(err)
        }
      })
    }
  }

  removeProductFromCart(id:number){
    let product = this.products.find(product => product.id === id);
    this.subtotal -= product.price*product.quantity;
    this.delivery = this.subtotal > 100 ? 0 : 50;
    this.total = this.delivery + this.subtotal;
    this.products = this.products.filter(product => product.id !== id);
    this.idArray = this.idArray.filter((arrayId: any) => arrayId !== id);
    console.log('filtered ids', this.idArray)
    localStorage.setItem('cartItems', JSON.stringify(this.idArray));
    console.log('cart items', localStorage.getItem('cartItems'))
  }

  increasePricing(increase :boolean, price :number){
    this.subtotal = increase ? this.subtotal += price : this.subtotal -= price;
    this.delivery = this.subtotal > 100 ? 0 : 50;
    this.total = this.delivery + this.subtotal;
    this.setPriceInLocalStorage(this.subtotal, this.total, this.delivery);
  }

  increaseQuantity(productId:number){
    let product = this.products.find(product => product.id === productId);
    product.quantity++;
    this.idArray.push(productId);
    localStorage.setItem('cartItems', JSON.stringify(this.idArray));
    this.increasePricing(true, product.price);
  }

  decreaseQuantity(productId:number){
    let product = this.products.find(product => product.id === productId);
    if(product.quantity > 1){
      product.quantity--;
      const indexToRemove = this.idArray.indexOf(productId);
      if (indexToRemove !== -1) {
        this.idArray.splice(indexToRemove, 1);
      }
      localStorage.setItem('cartItems', JSON.stringify(this.idArray));
      this.increasePricing(false, product.price)
    }
  }

  setPriceInLocalStorage(subtotal: number, total: number, delivery: number){
    localStorage.setItem('subtotalPrice', JSON.stringify(this.subtotal));
    localStorage.setItem('totalPrice', JSON.stringify(this.total));
    localStorage.setItem('delivery', JSON.stringify(this.delivery));
  }


    protected readonly localStorage = localStorage;
  protected readonly JSON = JSON;
}
