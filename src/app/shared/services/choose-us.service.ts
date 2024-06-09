import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {apis} from "../../constants/apis";

@Injectable({
  providedIn: 'root'
})
export class ChooseUsService extends ApiService{

  constructor(
    http: HttpClient,
  ) {
    super(http, apis.support);
  }
}
