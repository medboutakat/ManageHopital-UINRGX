import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { customerCat } from './customerCat.Module';
import { ICrudService } from 'src/app/icrud-service';
import { RootURLS } from 'src/app/root-urls';

@Injectable({
    providedIn: "root",
  })
export class CustomerCatService implements ICrudService<customerCat>{

    ReponseUrl: string;

    RepByDm: customerCat[];
  
    constructor(private http: HttpClient) {
      this.ReponseUrl=RootURLS.getUrl("CustomerCategory");
    }
    
    getAll(): Observable<customerCat[]> {
        return this.http.get<customerCat[]>(this.ReponseUrl);
      }
    
      getById(payload: string): Observable<customerCat> {
        return this.http.get<customerCat>(`${this.ReponseUrl}/${payload}`);
      }



    add(payload: customerCat): Observable<customerCat> {

        console.log("service Add",payload)
        return this.http.post<customerCat>(this.ReponseUrl, payload);
      }

      update(payload: customerCat): Observable<customerCat> {
        console.log("service update",payload)
    
        return this.http.put<customerCat>(
          `${this.ReponseUrl}/${payload.id}`,
          payload
        );
        }
        delete(payload: string) {
            return this.http.delete(`${this.ReponseUrl}/${payload}`);
          } 
}