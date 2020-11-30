import { Injectable } from '@angular/core';
import { importType } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cplogbookDraft } from '../../_models/cplogbookDraft.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class CplogbookDraftService {
//apiURL = 'http://localhost:3000/cpConditionMonitoring';
   apiURL='http://172.18.7.29:3000/cpConditionMonitoring';
   //apiurl ='http://172.18.7.29:3000/cpConditionMonitoringi';
  cplogbookDraftdata: any;
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
  createCustomerDemorgaphics(cplogbookDraft): Observable<cplogbookDraft> {
    console.log("addfunction called")
    return this.http.post<cplogbookDraft>(this.apiURL, JSON.stringify(cplogbookDraft), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() method => Fetch cplogbookDraft list
  getCustomerDemographics(): Observable<cplogbookDraft> {
    return this.http.get<cplogbookDraft>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() single data method => Fetch employee
  getCustomerDemographic(primeNumber): Observable<cplogbookDraft> {
    return this.http.get<cplogbookDraft>(this.apiURL + '/' + primeNumber)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };


  setCustomerDemographicData(data) {
    return this.cplogbookDraftdata = data;
  }
  getCustomerDemographicData() {
    return this.cplogbookDraftdata;
  }

  // HttpClient API put() method => Update employee
  updateCustomerDemorgaphics(primeNumber,cplogbookDraft): Observable<cplogbookDraft> {
    console.log('updateCustomerDemographic() called');
    return this.http.put<cplogbookDraft>(this.apiURL + '/' + cplogbookDraft.primeNumber, JSON.stringify(cplogbookDraft), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  deleteCustomersdemographic(primeNumber){
    var p_json = '{"primeNumber":"'+ primeNumber + '"}';
    console.log(JSON.stringify(primeNumber));
    return this.http.put<cplogbookDraft>(this.apiURL , p_json, this.httpOptions)
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