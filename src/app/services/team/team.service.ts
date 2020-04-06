import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Team } from '../../shared/Team';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/teams`;
  
  constructor(private http: HttpClient) { }

  get(): Observable<Team[]> {
      console.log('Heeee:' + httpOptions);
    return this.http.get<Team[]>(this.apiUrl, httpOptions).pipe(
      tap(tipoServicos => console.log('get all teams' + Team)),
      catchError(this.handleError('get-Team', []))
    );
  }

  add(team: Team): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, team, httpOptions).pipe(
      tap((team: Team) => console.log('adicionou o team' + team)),
      catchError(this.handleError<Team>('add-Team'))
    );
  }

  update(id: number, team: Team): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, team, httpOptions).pipe(
      tap(team => console.log(`updated team id=${id}`)),
      catchError(this.handleError<any>('update-Team'))
    );
  }

  getById(id: number): Observable<Team> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Team>(url, httpOptions).pipe(
      tap(team => console.log(`Team by id=${id}`)),
      catchError(this.handleError<Team>(`Team by id=${id}`))
    );
  }

  remove(id: number): Observable<Team> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Team>(url, httpOptions).pipe(
      tap(team => console.log(`remove team by id=${id}`)),
      catchError(this.handleError<Team>('remove - Team'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
