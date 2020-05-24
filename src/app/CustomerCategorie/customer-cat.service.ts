import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs"; 
import { ICrudService } from '../icrud-service';
import { CustomerCat } from './customer-cat.model'; 
import { RootURLS } from '../root-urls';

@Injectable({
  providedIn: "root",
})
export class CustomerCatService implements ICrudService<CustomerCat> {

  ReponseUrl: string;

  RepByDm: CustomerCat[];

  constructor(private http: HttpClient) {
    this.ReponseUrl=RootURLS.getUrl("CustomerCategory");
  }

  getAll(): Observable<CustomerCat[]> {
    return this.http.get<CustomerCat[]>(this.ReponseUrl);
  }

  getById(payload: string): Observable<CustomerCat> {
    return this.http.get<CustomerCat>(`${this.ReponseUrl}/${payload}`);
  }

  add(payload: CustomerCat): Observable<CustomerCat> {

    console.log("service Add",payload)
    return this.http.post<CustomerCat>(this.ReponseUrl, payload);
  }

  update(payload: CustomerCat): Observable<CustomerCat> {
    console.log("service update",payload)

    return this.http.put<CustomerCat>(
      `${this.ReponseUrl}/${payload.id}`,
      payload
    );
    // return this.http.patch<CustomerCat>(
    //   `${this.ReponseUrl}/${CustomerCat.id}`,
    //   CustomerCat
    // );

  }

  delete(payload: string) {
    return this.http.delete(`${this.ReponseUrl}/${payload}`);
  } 
}
