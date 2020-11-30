import { Injectable } from '@angular/core';
import { importType } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { valuationExpiry } from '../../_models/valuationExpiry.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class valuationExpiryService {
 // apiURL = 'http://localhost:3000/valuationExpiryTickler';
  apiURL='http://172.18.7.29:3000/valuationExpiryTickler';
  valuationExpirydata: any;
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
  createCustomerDemorgaphics(valuationExpiry): Observable<valuationExpiry> {
    console.log(JSON.stringify(valuationExpiry));
    return this.http.post<valuationExpiry>(this.apiURL, JSON.stringify(valuationExpiry), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() method => Fetch customerDemorgaphics list
  getCustomerDemographics(): Observable<valuationExpiry> {
    return this.http.get<valuationExpiry>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() single data method => Fetch employee
  getCustomerDemographic(primeNumber): Observable<valuationExpiry> {
    return this.http.get<valuationExpiry>(this.apiURL + '/' + primeNumber)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };


  setCustomerDemographicData(data) {
    return this.valuationExpirydata = data;
  }
  getCustomerDemographicData() {
    return this.valuationExpirydata;
  }

  // HttpClient API put() method => Update employee
  updateCustomerDemorgaphics(primeNumber,valuationExpiry): Observable<valuationExpiry> {
    console.log('updateCustomerDemographic() called');
    return this.http.put<valuationExpiry>(this.apiURL + '/' + valuationExpiry.primeNumber, JSON.stringify(valuationExpiry), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  deleteCustomersdemographic(primeNumber){
    var p_json = '{"primeNumber":"'+ primeNumber + '"}';
    console.log(JSON.stringify(primeNumber));
    return this.http.put<valuationExpiry>(this.apiURL , p_json, this.httpOptions)
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