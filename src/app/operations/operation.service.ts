import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Operation } from './operation';
import { OperationCategory } from './operation-category';
import { ICrudService } from '../icrud-service';
import { RootURLS } from '../root-urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationService implements ICrudService<Operation> {
  constructor(private http: HttpClient) {
    this.ReponseUrl = RootURLS.getUrl("Operation");
  }
  ReponseUrl: string;
  RepByDm: Operation[];
  getAll(): Observable<Operation[]> {
    return this.http.get<Operation[]>(this.ReponseUrl);
  }
  getById(payload: string): Observable<Operation> {
    return this.http.get<Operation>(`${this.ReponseUrl}/${payload}`);
  }
  add(payload: Operation): Observable<Operation> {
    return this.http.post<Operation>(this.ReponseUrl, payload);
  }
  update(operation: Operation): Observable<Operation> {
    console.log("service update", operation)
    return this.http.put<Operation>(
      `${this.ReponseUrl}/${operation.id}`,
      operation
    );
  }
  delete(payload: string) {
    return this.http.delete(`${this.ReponseUrl}/${payload}`);
  }
}
