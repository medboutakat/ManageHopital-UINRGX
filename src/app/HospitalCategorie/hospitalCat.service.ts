import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HospitalCat } from "./hospitalCat.model";
import { ICrudService } from '../icrud-service';
import { environment } from 'src/environments/environment';
import { RootURLS } from '../root-urls';

@Injectable({
  providedIn: "root",
})
export class HospitalCatService implements ICrudService<HospitalCat> {

  ReponseUrl: string;

  RepByDm: HospitalCat[];

  constructor(private http: HttpClient) {
    this.ReponseUrl=RootURLS.getUrl("HospitalCategory");
  }

  getAll(): Observable<HospitalCat[]> {
    return this.http.get<HospitalCat[]>(this.ReponseUrl);
  }

  getById(payload: number): Observable<HospitalCat> {
    return this.http.get<HospitalCat>(`${this.ReponseUrl}/${payload}`);
  }

  add(payload: HospitalCat): Observable<HospitalCat> {
    return this.http.post<HospitalCat>(this.ReponseUrl, payload);
  }

  update(hospitalCat: HospitalCat): Observable<HospitalCat> {
    return this.http.patch<HospitalCat>(
      `${this.ReponseUrl}/${hospitalCat.id}`,
      hospitalCat
    );
  }

  delete(payload: string) {
    return this.http.delete(`${this.ReponseUrl}/${payload}`);
  } 
}
