import {Component, OnInit, EventEmitter, Output, OnChanges} from '@angular/core';
import { ProductsService } from "./services/products.service";
import { IProduct } from "../../shared/interfaces/i-product";
import { SharedModule } from "../../shared/shared.module";
import { PageEvent } from "@angular/material/paginator";
import { CategoriesService } from "./services/categories.service";
import { ICategory } from "../../shared/interfaces/i-category";
import { CartService } from "../../shared/services/cart.service";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnChanges {

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private cartService: CartService
  ) { }

  @Output() cartItemCountChange = new EventEmitter<number>();
  products: IProduct[] = [];
  category_id: any = 0;
  sort: any = '';
  categories: ICategory[] = [];

  sortBy: any[] = [
    { 'id': 'asc', 'name': 'Price asc' },
    { 'id': 'desc', 'name': 'Price desc' }
  ];

  ngOnInit() {
    this.getProducts('0', '');
    this.getCategories();
  }

  getProducts(categoryId: number | string, sortDirection: string) {
    this.productsService.getProducts(categoryId, sortDirection).subscribe(
      (data) => {
        console.log(data);
        this.products = data.filter(product => product.available).map(product => {
          const primaryImage = product.image ? product.image : null;
          product.image = {
            path: primaryImage && primaryImage.path ? primaryImage.path : 'luxe-chair.jpg',
            alt: primaryImage && primaryImage.alt ? primaryImage.alt : 'Default image description'
          };
          return product;
        });
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  ngOnChanges(){

  }

  getCategories() {
    this.categoriesService.getAll().subscribe({
      next: data => {
        this.categories = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addToCart(){

  }

  filterProducts(categoryId: number | string): void {
    console.log(categoryId)
    this.category_id = categoryId;
    this.getProducts(this.category_id, this.sort)
  }

  sortProducts(sortId: number | string): void {
    console.log(sortId)
    this.sort = sortId;
    this.getProducts(this.category_id, this.sort)
  }

}
