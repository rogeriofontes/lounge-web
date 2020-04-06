import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { CompanyType } from '../../shared/CompanyType';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyTypeService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/company-types`;
  
  constructor(private http: HttpClient) { }

  get(): Observable<CompanyType[]> {
      console.log('Heeee:' + httpOptions);
    return this.http.get<CompanyType[]>(this.apiUrl, httpOptions).pipe(
      tap(tipoServicos => console.log('get all companyTypes' + tipoServicos)),
      catchError(this.handleError('get-CompanyType', []))
    );
  }

  add(companyType: CompanyType): Observable<CompanyType> {
    return this.http.post<CompanyType>(this.apiUrl, companyType, httpOptions).pipe(
      tap((companyType: CompanyType) => console.log('adicionou o companyType' + companyType)),
      catchError(this.handleError<CompanyType>('add-CompanyType'))
    );
  }

  update(id: number, companyType: CompanyType): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, companyType, httpOptions).pipe(
      tap(companyType => console.log(`updated companyType id=${id}`)),
      catchError(this.handleError<any>('update-CompanyType'))
    );
  }

  getById(id: number): Observable<CompanyType> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<CompanyType>(url, httpOptions).pipe(
      tap(companyType => console.log(`CompanyType by id=${id}`)),
      catchError(this.handleError<CompanyType>(`CompanyType by id=${id}`))
    );
  }

  remove(id: number): Observable<CompanyType> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<CompanyType>(url, httpOptions).pipe(
      tap(companyType => console.log(`remove companyType by id=${id}`)),
      catchError(this.handleError<CompanyType>('remove - CompanyType'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
