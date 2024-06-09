import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from "../../../shop/shop/services/products.service";
import {ButtonComponent} from "../button/button.component";
import {ItemCardComponent} from "../item-card/item-card.component";
import {IProduct} from "../../interfaces/i-product";

@Component({
  selector: 'app-products-section',
  standalone: true,
    imports: [ButtonComponent, ItemCardComponent],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css'
})
export class ProductsSectionComponent implements OnInit{

  constructor(
    private productsService: ProductsService
  ) {
  }

  products: IProduct[] = [];
  ngOnInit():void {
    this.productsService.getAll().subscribe({
      next: (data)=>{
        this.products = data.splice(0,3);
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }
}
