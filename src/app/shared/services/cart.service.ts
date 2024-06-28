import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apis} from "../../constants/apis";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class CartService extends ApiService{

  constructor(http: HttpClient) {
    super(http, apis.cart);
  }
}
