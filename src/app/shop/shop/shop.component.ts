import {Component, DoCheck, EventEmitter, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProductsService} from "./services/products.service";
import {IProduct} from "../../shared/interfaces/i-product";
import {SharedModule} from "../../shared/shared.module";
import {PageEvent} from "@angular/material/paginator";
import {CategoriesService} from "./services/categories.service";
import {ICategory} from "../../shared/interfaces/i-category";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
  ) {
  }

  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  itemsPerPage :IProduct[] = [];
  categories :ICategory[] = [];
  selectedSortOption: string | number = '';
  currentPage :number = 0;

  sortBy :any[]=[
    {
      'id' : 'asc',
      "name" : "Price asc"
    },
    {
      'id' : 'desc',
      "name" : "Price desc"
    }
  ]

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getProducts(){
    this.productsService.getAll().subscribe({
      next: data => {
        console.log(data);
        for(let product of data){
          if(product.availability){
            this.products.push(product);
          }
        }
        this.filteredProducts = this.products;
        this.pageSlice();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getCategories(){
    this.categoriesService.getAll().subscribe({
      next: data => {
        this.categories = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addToCart(productId: number): void {
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || "[]");
    cartItems.push(productId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log(localStorage.getItem('cartItems'));
  }

  filterProducts(categoryId : number | string) :void{
    this.filteredProducts = categoryId == 0 ? this.products
                                        : this.products.filter(product => product.category_id == categoryId)
    this.applySort();
    this.pageSlice();
  }

  sortProducts(sortId: string | number): void{
    this.selectedSortOption = sortId;
    this.applySort();
  }

  applySort(): void {
    this.itemsPerPage = this.selectedSortOption == 'asc' ? this.filteredProducts.sort((a, b) => a.price - b.price)
                                                                : this.filteredProducts.sort((a, b) => b.price - a.price);
    this.pageSlice();
  }

  pageSlice(){
    this.itemsPerPage = this.filteredProducts.slice(0,8)
  }

  onPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = (event.pageIndex + 1) * event.pageSize;
    if(endIndex > this.filteredProducts.length){
      endIndex = this.filteredProducts.length;
    }
    this.itemsPerPage = this.filteredProducts.slice(startIndex, endIndex);
  }

}
