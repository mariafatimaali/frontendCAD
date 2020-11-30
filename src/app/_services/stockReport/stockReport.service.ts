import { Injectable } from '@angular/core';
import { importType } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stockReport } from '../../_models/stockReportTickler.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class stockReportService {
  //apiURL = 'http://localhost:3000/stockReportTickler';
 apiURL='http://172.18.7.29:3000/stockReportTickler';
 apiurl='http://172.18.7.29:3000/stockReportTicklerabc';
  stockReportdata: any;
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
  createCustomerDemorgaphics(stockReport): Observable<stockReport> {
    console.log(JSON.stringify(stockReport));
    return this.http.post<stockReport>(this.apiURL, JSON.stringify(stockReport), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() method => Fetch customerDemorgaphics list
  getCustomerDemographics(): Observable<stockReport> {
    return this.http.get<stockReport>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() single data method => Fetch employee
  getCustomerDemographic(primeNumber): Observable<stockReport> {
    return this.http.get<stockReport>(this.apiURL + '/' + primeNumber)
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
 
    
 
  setCustomerDemographicData(data) {
    return this.stockReportdata = data;
  }
  getCustomerDemographicData() {
    return this.stockReportdata;
  }

  // HttpClient API put() method => Update employee
  updateCustomerDemorgaphics(primeNumber,stockReport): Observable<stockReport> {
    console.log('updateCustomerDemographic() called');
    return this.http.put<stockReport>(this.apiURL + '/' + stockReport.primeNumber, JSON.stringify(stockReport), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  deleteCustomersdemographic(primeNumber){
    var p_json = '{"primeNumber":"'+ primeNumber + '"}';
    console.log(JSON.stringify(primeNumber));
    return this.http.put<stockReport>(this.apiURL , p_json, this.httpOptions)
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