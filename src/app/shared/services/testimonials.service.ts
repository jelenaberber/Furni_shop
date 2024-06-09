import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {apis} from "../../constants/apis";

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService extends ApiService{

  constructor(
     http: HttpClient,
  ) {
    super(http, apis.testimonials)
  }

}
