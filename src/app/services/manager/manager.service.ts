import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Manager } from '../../shared/Manager';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/managers`;
 
  constructor(private http: HttpClient) {}

  get(): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.apiUrl, httpOptions).pipe(
      tap(manager => console.log('get all manager' + manager)),
      catchError(this.handleError('get-manager', []))
    );
  }

  add(manager: Manager): Observable<Manager> {
    return this.http.post<Manager>(this.apiUrl, manager, httpOptions).pipe(
      tap((manager: Manager) => console.log('adicionou o manager' + manager)),
      catchError(this.handleError<Manager>('add-manager'))
    );
  }

  update(id: number, manager: Manager): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, manager, httpOptions).pipe(
      tap(manager => console.log(`updated manager id=${id}`)),
      catchError(this.handleError<any>('update-manager'))
    );
  }

  getById(id: number): Observable<Manager> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Manager>(url, httpOptions).pipe(
      tap(manager => console.log(`manager by id=${id}`)),
      catchError(this.handleError<Manager>(`manager by id=${id}`))
    );
  }

  remove(id: number): Observable<Manager> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Manager>(url, httpOptions).pipe(
      tap(manager => console.log(`remove manager by id=${id}`)),
      catchError(this.handleError<Manager>('remove - manager'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
