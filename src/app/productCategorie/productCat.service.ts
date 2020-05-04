import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productCat } from './productCat.Module';
import { ICrudService } from '../icrud-service';
import { RootURLS } from '../root-urls';
@Injectable({
    providedIn: "root",
  })
export class productCatService implements ICrudService<productCat>{

    ReponseUrl: string;

    RepByDm: productCat[];
  
    constructor(private http: HttpClient) {
       this.ReponseUrl=RootURLS.getUrl("ProductCategory");
      //this.ReponseUrl="144.91.76.98:5000/api/ProductCategories";
    }
    
    getAll(): Observable<productCat[]> {
        return this.http.get<productCat[]>(this.ReponseUrl);
      }
    
    getById(payload: string): Observable<productCat> {
      return this.http.get<productCat>(`${this.ReponseUrl}/${payload}`);
    }

  add(payload: productCat): Observable<productCat> {
    console.log("service Add", payload);
    return this.http.post<productCat>(this.ReponseUrl, payload);
  }
  update(payload: productCat): Observable<productCat> {
    console.log("service update", payload);
    return this.http.put<productCat>(`${this.ReponseUrl}/${payload.id}`, payload);
  }
  delete(payload: string) {
    return this.http.delete(`${this.ReponseUrl}/${payload}`);
  }
}
