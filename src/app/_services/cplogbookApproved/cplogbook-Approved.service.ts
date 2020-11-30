import { Injectable } from '@angular/core';
import { importType } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { cplogbookApproved } from '../../_models/cplogbookApproved.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class CplogbookApprovedService {
 //apiURL = 'http://localhost:3000/cplogbook';
 apiURL='http://172.18.7.29:3000/cplogbook';
 apiurl='http://172.18.7.29:3000/cplogbookabc';
  cplogbookApproveddata: any;
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
  createCplogbookApproved(cplogbookApproved): Observable<cplogbookApproved> {
    console.log(JSON.stringify(cplogbookApproved));
    return this.http.post<cplogbookApproved>(this.apiURL, JSON.stringify(cplogbookApproved), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() method => Fetch customerDemorgaphics list
  getCplogbookApproveds(): Observable<cplogbookApproved> {
    return this.http.get<cplogbookApproved>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() single data method => Fetch employee
  getCplogbookApproved(primenumber): Observable<cplogbookApproved> {
    return this.http.get<cplogbookApproved>(this.apiURL + '/' + primenumber)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };


  setCplogbookApprovedData(data) {
    return this.cplogbookApproveddata = data;
  }
  getCplogbookApprovedData() {
    return this.cplogbookApproveddata;
  }

  // HttpClient API put() method => Update employee
  updateCplogbookApproved(primenumber,cplogbookApproved): Observable<cplogbookApproved> {
    console.log('updateCustomerDemographic() called');
    return this.http.put<cplogbookApproved>(this.apiURL + '/' + cplogbookApproved.primenumber, JSON.stringify(cplogbookApproved), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

 
  deleteCplogbookApproved(primenumber){
    return this.http.delete<cplogbookApproved>(this.apiURL + '/' + primenumber, this.httpOptions)
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
 
}