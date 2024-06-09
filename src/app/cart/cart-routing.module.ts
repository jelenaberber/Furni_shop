import {NgModule, OnInit} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartComponent} from "./cart/cart.component";
import {IProduct} from "../shared/interfaces/i-product";
import {ProductsService} from "../shop/shop/services/products.service";
import {ProductsInCartService} from "./cart/services/products-in-cart.service";

const routes: Routes = [{
  path: '',
  component: CartComponent,
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule{
}
