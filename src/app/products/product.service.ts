import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ICrudService } from '../icrud-service';
import { RootURLS } from '../root-urls';
import { Product } from './product.Module';

@Injectable({
  providedIn: "root",
})
export class ProductService implements ICrudService<Product>{

  ReponseUrl: string;

  RepByDm: Product[];

  constructor(private http: HttpClient) {
    this.ReponseUrl = RootURLS.getUrl("Product");
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.ReponseUrl);
  }

  getById(payload: string): Observable<Product> {
    return this.http.get<Product>(this.ReponseUrl + '/' + payload);
  }
  getByCategoryId(payload: string): Observable<Product> {
    return this.http.get<Product>(this.ReponseUrl + '/' + payload);
  }

  getByName(payload: string): Observable<Product> {
    console.log("URL : ", this.ReponseUrl + '/name/' + payload)
    return this.http.get<Product>(this.ReponseUrl + '/name/' + payload);
  }

  add(payload: Product): Observable<Product> {
    return this.http.post<Product>(this.ReponseUrl, payload);
  }

  update(payload: Product) {
    console.log('payload from service : ', payload)

    const params = new HttpParams().set('ID', payload.id + '');
    const headers = new HttpHeaders().set('content-type', 'application/json');
    // var body = {
    //   product: payload.product, description: payload.description, qte: payload.qte, price: payload.price,
    //   tax: payload.tax, toal:payload.total,id: payload.id
    // }
    return this.http.put<Product>(`${this.ReponseUrl}/${payload.id}`, payload, { headers, params })
  }

  delete(payload: string) {
    return this.http.delete(`${this.ReponseUrl}/${payload}`);
  }
}
