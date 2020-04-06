import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Job } from '../../shared/Job';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/jobs`;
  
  constructor(private http: HttpClient) { }

  get(): Observable<Job[]> {
      console.log('Heeee:' + httpOptions);
    return this.http.get<Job[]>(this.apiUrl, httpOptions).pipe(
      tap(tipoServicos => console.log('get all jobs' + Job)),
      catchError(this.handleError('get-Job', []))
    );
  }

  add(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job, httpOptions).pipe(
      tap((job: Job) => console.log('adicionou o job' + job)),
      catchError(this.handleError<Job>('add-Job'))
    );
  }

  update(id: number, job: Job): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, job, httpOptions).pipe(
      tap(job => console.log(`updated job id=${id}`)),
      catchError(this.handleError<any>('update-Job'))
    );
  }

  getById(id: number): Observable<Job> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Job>(url, httpOptions).pipe(
      tap(job => console.log(`Job by id=${id}`)),
      catchError(this.handleError<Job>(`Job by id=${id}`))
    );
  }

  remove(id: number): Observable<Job> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Job>(url, httpOptions).pipe(
      tap(job => console.log(`remove job by id=${id}`)),
      catchError(this.handleError<Job>('remove - Job'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
