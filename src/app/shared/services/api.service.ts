import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {config} from "../../constants/config";

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

  get(id :number | string):Observable<any>{
    return this.http.get(config.SERVER + this.apiPath + "/" + id)
  }

  create(dataToSend: any):Observable<any>{
    return this.http.post(config.SERVER + this.apiPath, dataToSend)
  }

  update(id :number | string, dataToSend: any):Observable<any>{
    return this.http.patch(config.LOCAL + this.apiPath + "/" + id, dataToSend)
  }

  delete(id :number | string):Observable<any>{
    return this.http.delete(config.LOCAL + this.apiPath + "/" + id)
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


}
