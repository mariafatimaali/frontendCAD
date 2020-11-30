import { Injectable } from '@angular/core';
import { importType } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { defanddeferral } from '../../_models/defanddeferral.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class DefandDeferralService {
  //apiURL = 'http://localhost:3000/defanddeferral';
  apiURL='http://172.18.7.29:3000/defanddeferral';
  defanddeferraldata: any;
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
  createCustomerDemorgaphics(defanddeferral): Observable<defanddeferral> {
    console.log(JSON.stringify(defanddeferral));
    return this.http.post<defanddeferral>(this.apiURL, JSON.stringify(defanddeferral), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() method => Fetch customerDemorgaphics list
  getCustomerDemographics(): Observable<defanddeferral> {
    return this.http.get<defanddeferral>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() single data method => Fetch employee
  getCustomerDemographic(primeNumber): Observable<defanddeferral> {
    return this.http.get<defanddeferral>(this.apiURL + '/' + primeNumber)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };


  setCustomerDemographicData(data) {
    return this.defanddeferraldata = data;
  }
  getCustomerDemographicData() {
    return this.defanddeferraldata;
  }

  // HttpClient API put() method => Update employee
  updateCustomerDemorgaphics(primeNumber,defanddeferral): Observable<defanddeferral> {
    console.log('updateCustomerDemographic() called');
    return this.http.put<defanddeferral>(this.apiURL + '/' + defanddeferral.primeNumber, JSON.stringify(defanddeferral), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // deleteCustomersdemographic(primeNumber){
  //   var p_json = '{"primeNumber":"'+ primeNumber + '"}';
  //   console.log(JSON.stringify(primeNumber));
  //   return this.http.delete<defanddeferral>(this.apiURL , p_json)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }
  deleteCustomersdemographic(primenumber){
    return this.http.delete<defanddeferral>(this.apiURL + '/employees/' + primenumber, this.httpOptions)
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