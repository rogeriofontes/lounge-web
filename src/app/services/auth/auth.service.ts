import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from '../../shared/User';
import { Register } from 'src/app/shared/Register';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/auth`;
  private registerUrl = `${this.BASE_URL}/v1/register`;

  constructor(private http: HttpClient) { }

  login(user: User): Promise<User> {
    return this.http.post<User>(this.apiUrl, user, httpOptions).toPromise();
  }

  register(register: Register): Promise<Boolean> {
    console.log("Register" + register);
    return this.http.post<Boolean>(this.registerUrl, register, httpOptions).toPromise();
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}