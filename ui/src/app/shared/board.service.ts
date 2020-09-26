import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {AttackInfo} from "./board";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BoardService {

  // Base url
  baseurl = `${environment.api}/board`;

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  // GET
  CreateBoard(): Observable<any> {
    let url = this.baseurl;
    return this.http.get<any[]>(url , this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  }

  // POST
  AttemptAttack(data): Observable<any> {
    return this.http.post<AttackInfo>(this.baseurl , JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // Error handling
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
