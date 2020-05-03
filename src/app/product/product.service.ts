import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { ICrudService } from '../icrud-service';
import { RootURLS } from '../root-urls';



@Injectable({
    providedIn :"root"
})

export class ProductService implements ICrudService<Product>{

  ReponseUrl: string;

  RepByDm: Product[];

    constructor( private  http : HttpClient ){
    this.ReponseUrl=RootURLS.getUrl("Product");

    }
    getAll(): Observable<Product[]> {
      return this.http.get<Product[]>(this.ReponseUrl);
    }
    getById(payload: string): Observable<Product> {
      return this.http.get<Product>(`${this.ReponseUrl}/${payload}`);
    }
    add(payload: Product): Observable<Product> {

      console.log("service Add",payload)
      return this.http.post<Product>(this.ReponseUrl, payload);
    }
  

    update(payload: Product): Observable<Product> {
      console.log("service update",payload)
  
      return this.http.put<Product>(
        `${this.ReponseUrl}/${payload.id}`,
        payload
      );
    }
    delete(payload: string) {
      return this.http.delete(`${this.ReponseUrl}/${payload}`);
    } 


    
    updateImages(payloadId: string,payloadData: FormData): Observable<Product> {
      console.log("service update",payloadId)
  
      return this.http.put<Product>(
        `${this.ReponseUrl}/${payloadId}`,
        payloadData
      );
    }

}