import { Injectable } from '@angular/core';
import { importType } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { branches } from '../../_models/branches.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class BranchService {
  apiURL = 'http://localhost:3000/branch';
 // apiURL='http://172.18.7.29:3000/branch';
  branchdata: any;
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
  createCustomerDemorgaphics(branches): Observable<branches> {
    console.log(JSON.stringify(branches));
    return this.http.post<branches>(this.apiURL, JSON.stringify(branches), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() method => Fetch cplogbookDraft list
  getCustomerDemographics(): Observable<branches> {
    return this.http.get<branches>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() single data method => Fetch employee
  getCustomerDemographic(primeNumber): Observable<branches> {
    return this.http.get<branches>(this.apiURL + '/' + primeNumber)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };


  setCustomerDemographicData(data) {
    return this.branchdata = data;
  }
  getCustomerDemographicData() {
    return this.branchdata;
  }

  // HttpClient API put() method => Update employee
  updateCustomerDemorgaphics(BranchCode,branches): Observable<branches> {
    console.log('updateCustomerDemographic() called');
    return this.http.put<branches>(this.apiURL + '/' + branches.BranchCode, JSON.stringify(branches), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  deleteCustomersdemographic(BranchCode){
    return this.http.delete<branches>(this.apiURL + '/employees/' + BranchCode, this.httpOptions)
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