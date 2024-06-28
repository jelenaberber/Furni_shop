import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apis} from "../../../constants/apis";
import {ApiService} from "../../../shared/services/api.service";

@Injectable({
  providedIn: 'root'
})
export class AddToCartService extends ApiService{

  constructor(http: HttpClient) {
    super(http, apis.cart);
  }
}
