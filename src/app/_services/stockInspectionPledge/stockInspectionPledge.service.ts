import { Injectable } from '@angular/core';
import { importType } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stockInspectionPledge } from '../../_models/stockInspectionPledge.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})

export class stockInspectionPledgeService {
 //apiURL = 'http://localhost:3000/pledgeStockInspectionTickler';
  apiURL='http://172.18.7.29:3000/pledgeStockInspectionTickler';
  stockInspectionPledgedata: any;
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
  createCustomerDemorgaphics(stockInspectionPledge): Observable<stockInspectionPledge> {
    console.log(JSON.stringify(stockInspectionPledge));
    return this.http.post<stockInspectionPledge>(this.apiURL, JSON.stringify(stockInspectionPledge), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() method => Fetch customerDemorgaphics list
  getCustomerDemographics(): Observable<stockInspectionPledge> {
    return this.http.get<stockInspectionPledge>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() single data method => Fetch employee
  getCustomerDemographic(primeNumber): Observable<stockInspectionPledge> {
    return this.http.get<stockInspectionPledge>(this.apiURL + '/' + primeNumber)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };


  setCustomerDemographicData(data) {
    return this.stockInspectionPledgedata = data;
  }
  getCustomerDemographicData() {
    return this.stockInspectionPledgedata;
  }

  // HttpClient API put() method => Update employee
  updateCustomerDemorgaphics(primeNumber,stockInspectionPledge): Observable<stockInspectionPledge> {
    console.log('updateCustomerDemographic() called');
    return this.http.put<stockInspectionPledge>(this.apiURL + '/' + stockInspectionPledge.primeNumber, JSON.stringify(stockInspectionPledge), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  deleteCustomersdemographic(primeNumber){
    var p_json = '{"primeNumber":"'+ primeNumber + '"}';
    console.log(JSON.stringify(primeNumber));
    return this.http.put<stockInspectionPledge>(this.apiURL , p_json, this.httpOptions)
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