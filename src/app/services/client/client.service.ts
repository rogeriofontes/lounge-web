import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Client } from '../../shared/Client';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/clients`;
 
  constructor(private http: HttpClient) {}

  get(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl, httpOptions).pipe(
      tap(client => console.log('get all client' + client)),
      catchError(this.handleError('get-client', []))
    );
  }

  add(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client, httpOptions).pipe(
      tap((client: Client) => console.log('adicionou o client' + client)),
      catchError(this.handleError<Client>('add-client'))
    );
  }

  update(id: number, client: Client): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, client, httpOptions).pipe(
      tap(client => console.log(`updated client id=${id}`)),
      catchError(this.handleError<any>('update-client'))
    );
  }

  getById(id: number): Observable<Client> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Client>(url, httpOptions).pipe(
      tap(client => console.log(`client by id=${id}`)),
      catchError(this.handleError<Client>(`client by id=${id}`))
    );
  }

  remove(id: number): Observable<Client> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Client>(url, httpOptions).pipe(
      tap(client => console.log(`remove client by id=${id}`)),
      catchError(this.handleError<Client>('remove - client'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
