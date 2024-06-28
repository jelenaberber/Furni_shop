import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {config} from "../../constants/config";
import {IProduct} from "../interfaces/i-product";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    protected http: HttpClient,
    @Inject('apiPath') protected apiPath: string
  ) { }

  private basePath = "http://localhost:4200/assets/jsons/";

  getAll():Observable<any>{
    return this.http.get(config.SERVER + this.apiPath)
  }

  getAllAdminPanel():Observable<any>{
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(config.SERVER + this.apiPath, {headers})
  }

  get(id :number | string):Observable<any>{
    return this.http.get(config.SERVER + this.apiPath + "/" + id)
  }

  create(dataToSend: any): Observable<any> {
    return this.http.post<any>(config.SERVER + this.apiPath, dataToSend).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'Server error';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else if (error.error && error.error.message) {
          errorMsg = error.error.message;
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  createWithToken(dataToSend: any):Observable<any>{
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(config.SERVER + this.apiPath, dataToSend, {headers})
  }

  update(id :number | string, dataToSend: any):Observable<any>{
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.patch(config.SERVER + this.apiPath + "/" + id, dataToSend, { headers })
  }

  delete(id :number ):Observable<any>{
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(config.SERVER + this.apiPath + "/" + id, { headers })
  }

  getFromJson():Observable<any>{
    return this.http.get(config.LOCAL + this.apiPath)
  }

  addProductToCart(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(config.SERVER + this.apiPath + "/" + id, {}, { headers });
  }

  getProductsInCart(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(config.SERVER + this.apiPath, { headers });
  }

  getProducts(categoryId: number | string, sort: string): Observable<IProduct[]> {
    const params = {
      category: categoryId.toString(),
      sort: sort
    };
    return this.http.get<IProduct[]>(config.SERVER + this.apiPath, { params });
  }

}
