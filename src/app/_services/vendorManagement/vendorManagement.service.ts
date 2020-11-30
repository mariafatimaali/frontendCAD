import { Injectable } from '@angular/core';
import { importType } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { vendorManagement } from '../../_models/vendorManagement.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class vendorManagementService {
 // apiURL = 'http://localhost:3000/vendorManagment';
  apiURL='http://172.18.7.29:3000/vendorManagment';
  vendorManagementdata: any;
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
  createCustomerDemorgaphics(vendorManagement): Observable<vendorManagement> {
    console.log(JSON.stringify(vendorManagement));
    return this.http.post<vendorManagement>(this.apiURL, JSON.stringify(vendorManagement), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() method => Fetch customerDemorgaphics list
  getCustomerDemographics(): Observable<vendorManagement> {
    return this.http.get<vendorManagement>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() single data method => Fetch employee
  getCustomerDemographic(primeNumber): Observable<vendorManagement> {
    return this.http.get<vendorManagement>(this.apiURL + '/' + primeNumber)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };


  setCustomerDemographicData(data) {
    return this.vendorManagementdata = data;
  }
  getCustomerDemographicData() {
    return this.vendorManagementdata;
  }

  // HttpClient API put() method => Update employee
  updateCustomerDemorgaphics(primeNumber,vendorManagement): Observable<vendorManagement> {
    console.log('updateCustomerDemographic() called');
    return this.http.put<vendorManagement>(this.apiURL + '/' + vendorManagement.primeNumber, JSON.stringify(vendorManagement), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  deleteCustomersdemographic(vendorCategory){
    var p_json = '{"vendorCategory":"'+ vendorCategory + '"}';
    console.log (p_json);
    console.log(JSON.stringify(vendorCategory));
    return this.http.put<vendorManagement>(this.apiURL , p_json, this.httpOptions)
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