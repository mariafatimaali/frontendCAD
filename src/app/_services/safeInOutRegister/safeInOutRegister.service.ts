import { Injectable } from '@angular/core';
import { importType } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { safeInOutRegister } from '../../_models/safeInOutRegister.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class safeInOutRegisterService {
  //apiURL = 'http://localhost:3000/safeInOutRegister';
 apiURL='http://172.18.7.29:3000/safeInOutRegister';
 
  safeInOutRegisterdata: any;
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
  createCustomerDemorgaphics(safeInOutRegister): Observable<safeInOutRegister> {
    console.log(JSON.stringify(safeInOutRegister));
    return this.http.post<safeInOutRegister>(this.apiURL, JSON.stringify(safeInOutRegister), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() method => Fetch customerDemorgaphics list
  getCustomerDemographics(): Observable<safeInOutRegister> {
    return this.http.get<safeInOutRegister>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() single data method => Fetch employee
  getCustomerDemographic(primeNumber): Observable<safeInOutRegister> {
    return this.http.get<safeInOutRegister>(this.apiURL + '/' + primeNumber)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };


  setCustomerDemographicData(data) {
    return this.safeInOutRegisterdata = data;
  }
  getCustomerDemographicData() {
    return this.safeInOutRegisterdata;
  }

  // HttpClient API put() method => Update employee
  updateCustomerDemorgaphics(primeNumber,safeInOutRegister): Observable<safeInOutRegister> {
    console.log('updateCustomerDemographic() called');
    return this.http.put<safeInOutRegister>(this.apiURL + '/' + safeInOutRegister.primeNumber, JSON.stringify(safeInOutRegister), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  deleteCustomersdemographic(primeNumber){
    var p_json = '{"primeNumber":"'+ primeNumber + '"}';
    console.log(JSON.stringify(primeNumber));
    return this.http.put<safeInOutRegister>(this.apiURL , p_json, this.httpOptions)
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