import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Position } from '../../shared/Position';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/positions`;
  
  constructor(private http: HttpClient) { }

  get(): Observable<Position[]> {
      console.log('Heeee:' + httpOptions);
    return this.http.get<Position[]>(this.apiUrl, httpOptions).pipe(
      tap(tipoServicos => console.log('get all positions' + Position)),
      catchError(this.handleError('get-Position', []))
    );
  }

  add(position: Position): Observable<Position> {
    return this.http.post<Position>(this.apiUrl, position, httpOptions).pipe(
      tap((position: Position) => console.log('adicionou o position' + position)),
      catchError(this.handleError<Position>('add-Position'))
    );
  }

  update(id: number, position: Position): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, position, httpOptions).pipe(
      tap(position => console.log(`updated position id=${id}`)),
      catchError(this.handleError<any>('update-Position'))
    );
  }

  getById(id: number): Observable<Position> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Position>(url, httpOptions).pipe(
      tap(position => console.log(`Position by id=${id}`)),
      catchError(this.handleError<Position>(`Position by id=${id}`))
    );
  }

  remove(id: number): Observable<Position> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Position>(url, httpOptions).pipe(
      tap(position => console.log(`remove position by id=${id}`)),
      catchError(this.handleError<Position>('remove - Position'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
