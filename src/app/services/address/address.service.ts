import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Address } from '../../shared/Address';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/addresses`;
  
  constructor(private http: HttpClient) { }

  get(): Observable<Address[]> {
    console.log('Heeee:' + httpOptions);
    return this.http.get<Address[]>(this.apiUrl, httpOptions).pipe(
      tap(address => console.log('get all addresss' + address)),
      catchError(this.handleError('get-Address', []))
    );
  }

  add(address: Address): Observable<Address> {
    return this.http.post<Address>(this.apiUrl, address, httpOptions).pipe(
      tap((address: Address) => console.log('adicionou o address' + address)),
      catchError(this.handleError<Address>('add-Address'))
    );
  }

  update(id: number, address: Address): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, address, httpOptions).pipe(
      tap(address => console.log(`updated address id=${id}`)),
      catchError(this.handleError<any>('update-Address'))
    );
  }

  getById(id: number): Observable<Address> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Address>(url, httpOptions).pipe(
      tap(address => console.log(`Address by id=${id}`)),
      catchError(this.handleError<Address>(`Address by id=${id}`))
    );
  }

  remove(id: number): Observable<Address> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Address>(url, httpOptions).pipe(
      tap(address => console.log(`remove address by id=${id}`)),
      catchError(this.handleError<Address>('remove - Address'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
