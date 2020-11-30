import { Injectable } from '@angular/core';
import { importType } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pledgejoint } from '../../_models/pledgejoint.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class pledgejointService {
  //apiURL = 'http://localhost:3000/pledgejointstockInspectionTickler';
  apiURL='http://172.18.7.29:3000/pledgejointstockInspectionTickler';
  pledgejointdata: any;
  constructor(private http: HttpClient) { }
  static ngInjectableDef = undefined;
  /*========================================
     CRUD Methods for consuming RESTful API
   =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // HttpClient API post() method => Create customerDemorgaphics
  createCustomerDemorgaphics(pledgejoint): Observable<pledgejoint> {
    console.log(JSON.stringify(pledgejoint));
    return this.http.post<pledgejoint>(this.apiURL, JSON.stringify(pledgejoint), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() method => Fetch customerDemorgaphics list
  getCustomerDemographics(): Observable<pledgejoint> {
    return this.http.get<pledgejoint>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() single data method => Fetch employee
  getCustomerDemographic(primeNumber): Observable<pledgejoint> {
    return this.http.get<pledgejoint>(this.apiURL + '/' + primeNumber)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };


  setCustomerDemographicData(data) {
    return this.pledgejointdata = data;
  }
  getCustomerDemographicData() {
    return this.pledgejointdata;
  }

  // HttpClient API put() method => Update employee
  updateCustomerDemorgaphics(primeNumber,pledgejoint): Observable<pledgejoint> {
    console.log('updateCustomerDemographic() called');
    return this.http.put<pledgejoint>(this.apiURL + '/' + pledgejoint.primeNumber, JSON.stringify(pledgejoint), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  deleteCustomersdemographic(primeNumber){
    var p_json = '{"primeNumber":"'+ primeNumber + '"}';
    console.log(JSON.stringify(primeNumber));
    return this.http.put<pledgejoint>(this.apiURL , p_json, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  };
}