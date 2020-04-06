import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Task } from '../../shared/Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/tasks`;
  
  constructor(private http: HttpClient) { }

  get(): Observable<Task[]> {
      console.log('Heeee:' + httpOptions);
    return this.http.get<Task[]>(this.apiUrl, httpOptions).pipe(
      tap(tipoServicos => console.log('get all tasks' + Task)),
      catchError(this.handleError('get-Task', []))
    );
  }

  add(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions).pipe(
      tap((task: Task) => console.log('adicionou o task' + task)),
      catchError(this.handleError<Task>('add-Task'))
    );
  }

  update(id: number, task: Task): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, task, httpOptions).pipe(
      tap(task => console.log(`updated task id=${id}`)),
      catchError(this.handleError<any>('update-Task'))
    );
  }

  getById(id: number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(url, httpOptions).pipe(
      tap(task => console.log(`Task by id=${id}`)),
      catchError(this.handleError<Task>(`Task by id=${id}`))
    );
  }

  remove(id: number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Task>(url, httpOptions).pipe(
      tap(task => console.log(`remove task by id=${id}`)),
      catchError(this.handleError<Task>('remove - Task'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
