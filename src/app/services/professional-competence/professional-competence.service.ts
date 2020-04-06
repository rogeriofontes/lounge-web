import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { ProfessionalCompetence } from '../../shared/ProfessionalCompetence';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfessionalCompetenceService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/professional-competences`;
  
  constructor(private http: HttpClient) { }

  get(): Observable<ProfessionalCompetence[]> {
      console.log('Heeee:' + httpOptions);
    return this.http.get<ProfessionalCompetence[]>(this.apiUrl, httpOptions).pipe(
      tap(tipoServicos => console.log('get all crofessionalCompetences' + tipoServicos)),
      catchError(this.handleError('get-ProfessionalCompetence', []))
    );
  }

  add(crofessionalCompetence: ProfessionalCompetence): Observable<ProfessionalCompetence> {
    return this.http.post<ProfessionalCompetence>(this.apiUrl, crofessionalCompetence, httpOptions).pipe(
      tap((crofessionalCompetence: ProfessionalCompetence) => console.log('adicionou o crofessionalCompetence' + crofessionalCompetence)),
      catchError(this.handleError<ProfessionalCompetence>('add-ProfessionalCompetence'))
    );
  }

  update(id: number, crofessionalCompetence: ProfessionalCompetence): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, crofessionalCompetence, httpOptions).pipe(
      tap(crofessionalCompetence => console.log(`updated crofessionalCompetence id=${id}`)),
      catchError(this.handleError<any>('update-ProfessionalCompetence'))
    );
  }

  getById(id: number): Observable<ProfessionalCompetence> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ProfessionalCompetence>(url, httpOptions).pipe(
      tap(crofessionalCompetence => console.log(`ProfessionalCompetence by id=${id}`)),
      catchError(this.handleError<ProfessionalCompetence>(`ProfessionalCompetence by id=${id}`))
    );
  }

  remove(id: number): Observable<ProfessionalCompetence> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ProfessionalCompetence>(url, httpOptions).pipe(
      tap(crofessionalCompetence => console.log(`remove crofessionalCompetence by id=${id}`)),
      catchError(this.handleError<ProfessionalCompetence>('remove - ProfessionalCompetence'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
