import { Injectable } from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {HttpClient} from "@angular/common/http";
import {apis} from "../../../constants/apis";
import {IProduct} from "../../../shared/interfaces/i-product";
import {Observable} from "rxjs";
import {config} from "../../../constants/config";

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ApiService{

  constructor(
    http: HttpClient,
  ) {
    super(http, apis.products);
  }


}
