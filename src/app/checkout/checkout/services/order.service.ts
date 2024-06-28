import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../../shared/services/api.service";
import {apis} from "../../../constants/apis";

@Injectable({
  providedIn: 'root'
})
export class OrderService extends ApiService{

  constructor(http: HttpClient) {
    super(http, apis.order);
  }
}
