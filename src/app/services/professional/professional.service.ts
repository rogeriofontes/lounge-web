import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Professional } from '../../shared/Professional';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/professionals`;
 
  constructor(private http: HttpClient) {}

  get(): Observable<Professional[]> {
    return this.http.get<Professional[]>(this.apiUrl, httpOptions).pipe(
      tap(professional => console.log('get all professional' + professional)),
      catchError(this.handleError('get-professional', []))
    );
  }

  add(professional: Professional): Observable<Professional> {
    return this.http.post<Professional>(this.apiUrl, professional, httpOptions).pipe(
      tap((professional: Professional) => console.log('adicionou o professional' + professional)),
      catchError(this.handleError<Professional>('add-professional'))
    );
  }

  update(id: number, professional: Professional): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, professional, httpOptions).pipe(
      tap(professional => console.log(`updated professional id=${id}`)),
      catchError(this.handleError<any>('update-professional'))
    );
  }

  getById(id: number): Observable<Professional> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Professional>(url, httpOptions).pipe(
      tap(professional => console.log(`professional by id=${id}`)),
      catchError(this.handleError<Professional>(`professional by id=${id}`))
    );
  }

  remove(id: number): Observable<Professional> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Professional>(url, httpOptions).pipe(
      tap(professional => console.log(`remove professional by id=${id}`)),
      catchError(this.handleError<Professional>('remove - professional'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
