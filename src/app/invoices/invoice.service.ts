import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs"; 
import { ICrudService } from '../icrud-service';
import { RootURLS } from '../root-urls';
import { Invoice } from './invoice-model';

@Injectable({
  providedIn: "root",
})
export class InvoiceService implements ICrudService<Invoice> {

  ReponseUrl: string;

  RepByDm: Invoice[];

  constructor(private http: HttpClient) {
    this.ReponseUrl=RootURLS.getUrl("Invoice");
  }

  getAll(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.ReponseUrl);
  }

  getById(payload: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.ReponseUrl}/${payload}`);
  }

  add(payload: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.ReponseUrl, payload);
  }

  update(payload: Invoice): Observable<Invoice> {
    return this.http.patch<Invoice>(
      `${this.ReponseUrl}/${payload.id}`,
      payload
    );
  }

  delete(payload: string) {
    return this.http.delete(`${this.ReponseUrl}/${payload}`);
  } 
}
