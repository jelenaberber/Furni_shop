import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
    return this.http.get(config.LOCAL + this.apiPath)
  }

  // get(id :number | string):Observable<any>{
  //   return this.http.get(config.LOCAL + this.apiPath + "/" + id)
  // }
  //
  // create(dataToSend: any):Observable<any>{
  //   return this.http.post(config.LOCAL + this.apiPath, dataToSend)
  // }
  //
  // update(id :number | string, dataToSend: any):Observable<any>{
  //   return this.http.patch(config.LOCAL + this.apiPath + "/" + id, dataToSend)
  // }
  //
  // delete(id :number | string):Observable<any>{
  //   return this.http.delete(config.LOCAL + this.apiPath + "/" + id)
  // }


}
