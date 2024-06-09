import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PopularProductsService} from "./services/popular-products.service";
import {IProduct} from "../../shared/interfaces/i-product";
import {SharedModule} from "../../shared/shared.module";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{


  constructor(
    private popularProductsService : PopularProductsService,
  ) { }

  popularProducts: IProduct[] = [];
  ngOnInit():void {
    this.popularProductsService.getAll().subscribe({
      next: (data)=>{
        this.popularProducts = data.splice(0,3);
        console.log(this.popularProducts);
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }




}
