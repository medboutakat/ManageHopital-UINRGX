import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointement } from './appointement.model';

@Injectable({
  providedIn: 'root'
})
export class AppointetmentService {
  url = "http://144.91.76.98:5002/api/Appointement/"
  constructor(private http: HttpClient) { }
  getAppointements() {
    return this.http.get<Appointement[]>(this.url)
  }
}
