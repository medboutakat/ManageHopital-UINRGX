import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { ICrudService } from 'src/app/icrud-service';
import { RootURLS } from 'src/app/root-urls';
import { Tax } from './tax.Module';

@Injectable({
    providedIn: "root",
  })
export class TaxService implements ICrudService<Tax>{

    ReponseUrl: string;

    RepByDm: Tax[];
  
    constructor(private http: HttpClient) {
      this.ReponseUrl=RootURLS.getUrl("tax");
    }
    
    getAll(): Observable<Tax[]> {
        return this.http.get<Tax[]>(this.ReponseUrl);
      }
    
      getById(payload: string): Observable<Tax> {
        return this.http.get<Tax>(`${this.ReponseUrl}/${payload}`);
      }



    add(payload: Tax): Observable<Tax> {

        console.log("service Add",payload)
        return this.http.post<Tax>(this.ReponseUrl, payload);
      }

      update(payload: Tax): Observable<Tax> {
        console.log("service update",payload)
    
        return this.http.put<Tax>(
          `${this.ReponseUrl}/${payload.id}`,
          payload
        );
        }
        delete(payload: string) {
            return this.http.delete(`${this.ReponseUrl}/${payload}`);
          } 
}