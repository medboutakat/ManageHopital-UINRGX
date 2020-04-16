import { Injectable } from '@angular/core';
import { ICrudService } from '../icrud-service';
import { OperationCategory } from './operation-category';
import { HttpClient } from '@angular/common/http';
import { RootURLS } from '../root-urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationCatService implements ICrudService<OperationCategory> {
  constructor(private http: HttpClient) {
    this.ReponseUrl = RootURLS.getUrl("OperationCategory");
  }
  ReponseUrl: string;
  RepByDm: OperationCategory[];
  getAll(): Observable<OperationCategory[]> {
    return this.http.get<OperationCategory[]>(this.ReponseUrl);
  }
  getById(payload: number): Observable<OperationCategory> {
    return this.http.get<OperationCategory>(`${this.ReponseUrl}/${payload}`);
  }
  add(payload: OperationCategory): Observable<OperationCategory> {
    return this.http.post<OperationCategory>(this.ReponseUrl, payload);
  }
  update(operation: OperationCategory): Observable<OperationCategory> {
    return this.http.patch<OperationCategory>(
      `${this.ReponseUrl}/${operation.id}`,
      operation
    );
  }
  delete(payload: string) {
    return this.http.delete(`${this.ReponseUrl}/${payload}`);
  }
}
