import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { DocumentRegion } from '../../shared/DocumentRegion';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class DocumentRegionService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/document-regions`;
 
  constructor(private http: HttpClient) {}

  get(): Observable<DocumentRegion[]> {
    return this.http.get<DocumentRegion[]>(this.apiUrl, httpOptions).pipe(
      tap(tipoServicos => console.log('get all documentRegions' + DocumentRegion)),
      catchError(this.handleError('DocumentRegion', []))
    );
  }

  getByAcronym(acronym: string): Observable<DocumentRegion> {
    const url = `${this.apiUrl}/acronym?name=${acronym}`;
    return this.http.get<DocumentRegion>(url, httpOptions).pipe(
      tap(discipline => console.log(`DocumentRegion by id=${acronym}`)),
      catchError(this.handleError<DocumentRegion>(`DocumentRegion by id=${acronym}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
