import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { doctorCat } from './doctorCat.module';
import { ICrudService } from 'src/app/icrud-service';
import { RootURLS } from 'src/app/root-urls';

@Injectable({
    providedIn: "root",
  })
export class DoctorCatService implements ICrudService<doctorCat>{

    ReponseUrl: string;

    RepByDm: doctorCat[];
  
    constructor(private http: HttpClient) {
      this.ReponseUrl=RootURLS.getUrl("DoctorCategory");
    }
    
    getAll(): Observable<doctorCat[]> {
        return this.http.get<doctorCat[]>(this.ReponseUrl);
      }
    
      getById(payload: string): Observable<doctorCat> {
        return this.http.get<doctorCat>(`${this.ReponseUrl}/${payload}`);
      }



    add(payload: doctorCat): Observable<doctorCat> {

        console.log("service Add",payload)
        return this.http.post<doctorCat>(this.ReponseUrl, payload);
      }

      update(payload: doctorCat): Observable<doctorCat> {
        console.log("service update",payload)
    
        return this.http.put<doctorCat>(
          `${this.ReponseUrl}/${payload.id}`,
          payload
        );
        }
        delete(payload: string) {
            return this.http.delete(`${this.ReponseUrl}/${payload}`);
          } 
}