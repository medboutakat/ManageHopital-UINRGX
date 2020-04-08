import { Observable } from 'rxjs';

export interface ICrudService<T> {
    
    ReponseUrl:string;

    getAll(): Observable<T[]>;
    
    getById(payload: number): Observable<T>;
    
    add(payload: T): Observable<T>;
    
    update(hospitalCat: T): Observable<T>;
    
    delete(payload: string);
 
}
