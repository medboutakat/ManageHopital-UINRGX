import { Injectable } from '@angular/core';
import { ICrudService } from '../icrud-service';
import { City } from './city';
import { HttpClient } from '@angular/common/http';
import { RootURLS } from '../root-urls';

@Injectable({
  providedIn: 'root'
})
export class CityService implements ICrudService<City> {

  constructor(private http: HttpClient) {
    this.ReponseUrl = RootURLS.getUrl("City");
  }
  ReponseUrl: string;
  RepByDm: City[];

  getAll(): import("rxjs").Observable<City[]> {
    return this.http.get<City[]>(this.ReponseUrl);
  }
  getById(payload: string): import("rxjs").Observable<City> {
    return this.http.get<City>(`${this.ReponseUrl}/${payload}`);
  }
  add(payload: City): import("rxjs").Observable<City> {
    throw new Error("Method not implemented.");
  }
  update(hospitalCat: City): import("rxjs").Observable<City> {
    throw new Error("Method not implemented.");
  }
  delete(payload: string) {
    throw new Error("Method not implemented.");
  }
}
