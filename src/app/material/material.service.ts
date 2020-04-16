import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs"; 
import { ICrudService } from '../icrud-service';
import { RootURLS } from '../root-urls';
import { Material } from './Material-model';

@Injectable({
  providedIn: "root",
})
export class MaterialService implements ICrudService<Material> {

  ReponseUrl: string;

  RepByDm: Material[];

  constructor(private http: HttpClient) {
    this.ReponseUrl=RootURLS.getUrl("Material");
  }

  getAll(): Observable<Material[]> {
    return this.http.get<Material[]>(this.ReponseUrl);
  }

  getById(payload: string): Observable<Material> {
    return this.http.get<Material>(`${this.ReponseUrl}/${payload}`);
  }

  add(payload: Material): Observable<Material> {
    return this.http.post<Material>(this.ReponseUrl, payload);
  }

  update(payload: Material): Observable<Material> {
    return this.http.patch<Material>(
      `${this.ReponseUrl}/${payload.id}`,
      payload
    );
  }

  delete(payload: string) {
    return this.http.delete(`${this.ReponseUrl}/${payload}`);
  } 
}
