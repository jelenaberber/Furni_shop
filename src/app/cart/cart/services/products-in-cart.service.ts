import { Injectable } from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {HttpClient} from "@angular/common/http";
import {apis} from "../../../constants/apis";


@Injectable({
  providedIn: 'root'
})
export class ProductsInCartService extends ApiService{

  constructor(
    http: HttpClient,
  ) {
    super(http, apis.products);
  }
}
