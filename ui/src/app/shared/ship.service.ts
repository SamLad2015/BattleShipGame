import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Ship, ShipPlacementInfo, ShipsPlacementInfo} from "./ship";

@Injectable({
  providedIn: 'root'
})

export class ShipService {

  // Base url
  baseurl = `${environment.api}/ship`;

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  // POST
  AddShips(data: Ship[]): Observable<any> {
    let url = this.baseurl;
    return this.http.post<Ship[]>(url, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  }

  // PUT
  PlaceShips(data: ShipsPlacementInfo): Observable<any> {
    return this.http.put<ShipsPlacementInfo>(this.baseurl , JSON.stringify(data), this.httpOptions)
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
