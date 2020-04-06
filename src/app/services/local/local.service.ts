import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Local } from '../../shared/Local';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/locals`;
 
  constructor(private http: HttpClient) {}

  get(): Observable<Local[]> {
    return this.http.get<Local[]>(this.apiUrl, httpOptions).pipe(
      tap(local => console.log('get all local' + local)),
      catchError(this.handleError('get-local', []))
    );
  }

  add(local: Local): Observable<Local> {
    return this.http.post<Local>(this.apiUrl, local, httpOptions).pipe(
      tap((local: Local) => console.log('adicionou o local' + local)),
      catchError(this.handleError<Local>('add-local'))
    );
  }

  update(id: number, local: Local): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, local, httpOptions).pipe(
      tap(local => console.log(`updated local id=${id}`)),
      catchError(this.handleError<any>('update-local'))
    );
  }

  getById(id: number): Observable<Local> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Local>(url, httpOptions).pipe(
      tap(local => console.log(`local by id=${id}`)),
      catchError(this.handleError<Local>(`local by id=${id}`))
    );
  }

  remove(id: number): Observable<Local> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Local>(url, httpOptions).pipe(
      tap(local => console.log(`remove local by id=${id}`)),
      catchError(this.handleError<Local>('remove - local'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
