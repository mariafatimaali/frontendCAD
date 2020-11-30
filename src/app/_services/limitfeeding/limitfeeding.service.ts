import { Injectable } from '@angular/core';
import { importType } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { limitfeeding } from '../../_models/limitfeeding.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class limitfeedingService {
  //apiURL = 'http://localhost:3000/limitFeedingPending';
  apiURL='http://172.18.7.29:3000/limitFeedingPending';
  apiurl='http://172.18.7.29:3000/limitFeedingPendingabc';
  limitfeedingdata: any;
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
  createCustomerDemorgaphics(limitfeeding): Observable<limitfeeding> {
    console.log(JSON.stringify(limitfeeding));
    return this.http.post<limitfeeding>(this.apiURL, JSON.stringify(limitfeeding), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() method => Fetch customerDemorgaphics list
  getCustomerDemographics(): Observable<limitfeeding> {
    return this.http.get<limitfeeding>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };
  findOneCustomerDemographics(primeNumber){
    // console.log (JSON.stringify(primeNumber))
    console.log(primeNumber)
    const data = {"primeNumber": primeNumber};
 
     return this.http.post(this.apiurl, data)
     
       .pipe(
         retry(1),
         catchError(this.handleError)
       )
     };
 

  // HttpClient API get() single data method => Fetch employee
  getCustomerDemographic(primeNumber): Observable<limitfeeding> {
    return this.http.get<limitfeeding>(this.apiURL + '/' + primeNumber)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };


  setCustomerDemographicData(data) {
    return this.limitfeedingdata = data;
  }
  getCustomerDemographicData() {
    return this.limitfeedingdata;
  }

  // HttpClient API put() method => Update employee
  updateCustomerDemorgaphics(primeNumber,limitfeeding): Observable<limitfeeding> {
    console.log('updateCustomerDemographic() called');
    return this.http.put<limitfeeding>(this.apiURL + '/' + limitfeeding.primeNumber, JSON.stringify(limitfeeding), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  deleteCustomersdemographic(primeNumber){
    var p_json = '{"primeNumber":"'+ primeNumber + '"}';
    console.log(JSON.stringify(primeNumber));
    return this.http.put<limitfeeding>(this.apiURL , p_json, this.httpOptions)
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