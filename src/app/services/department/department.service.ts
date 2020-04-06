import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Department } from '../../shared/Department';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/departments`;
  
  constructor(private http: HttpClient) { }

  get(): Observable<Department[]> {
      console.log('Heeee:' + httpOptions);
    return this.http.get<Department[]>(this.apiUrl, httpOptions).pipe(
      tap(tipoServicos => console.log('get all departments' + Department)),
      catchError(this.handleError('get-Department', []))
    );
  }

  add(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department, httpOptions).pipe(
      tap((department: Department) => console.log('adicionou o department' + department)),
      catchError(this.handleError<Department>('add-Department'))
    );
  }

  update(id: number, department: Department): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, department, httpOptions).pipe(
      tap(department => console.log(`updated department id=${id}`)),
      catchError(this.handleError<any>('update-Department'))
    );
  }

  getById(id: number): Observable<Department> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Department>(url, httpOptions).pipe(
      tap(department => console.log(`Department by id=${id}`)),
      catchError(this.handleError<Department>(`Department by id=${id}`))
    );
  }

  remove(id: number): Observable<Department> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Department>(url, httpOptions).pipe(
      tap(department => console.log(`remove department by id=${id}`)),
      catchError(this.handleError<Department>('remove - Department'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
