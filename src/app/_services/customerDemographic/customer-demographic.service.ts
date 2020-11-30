import { Injectable } from '@angular/core';
import { importType } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders ,HttpParams } from '@angular/common/http';
import { customerDemorgaphics } from '../../_models/customerDemographics.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class CustomerDemographicService {
// apiURL = 'http://localhost:3000/customerDemographic';
 apiURL='http://172.18.7.29:3000/customerDemographic';
 apiurl='http://172.18.7.29:3000/customerDemographicabc';
  customerDemographicdata: any;
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
  createCustomerDemorgaphics(customerDemorgaphics): Observable<customerDemorgaphics> {
    console.log(JSON.stringify(customerDemorgaphics));
    return this.http.post<customerDemorgaphics>(this.apiURL, JSON.stringify(customerDemorgaphics), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() method => Fetch customerDemorgaphics list
  getCustomerDemographics(): Observable<customerDemorgaphics> {
    return this.http.get<customerDemorgaphics>(this.apiURL)
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
  getCustomerDemographic(primenumber): Observable<customerDemorgaphics> {
    return this.http.get<customerDemorgaphics>(this.apiURL + '/' + primenumber)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };


  setCustomerDemographicData(data) {
    return this.customerDemographicdata = data;
  }
  getCustomerDemographicData() {
    return this.customerDemographicdata;
  }

  // HttpClient API put() method => Update employee
  updateCustomerDemorgaphics(primenumber,customerDemorgaphics): Observable<customerDemorgaphics> {
    console.log('updateCustomerDemographic() called');
    return this.http.put<customerDemorgaphics>(this.apiURL + '/' + customerDemorgaphics.primenumber, JSON.stringify(customerDemorgaphics), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  deleteCustomersdemographic(primenumber){
    return this.http.put<customerDemorgaphics>(this.apiURL, this.httpOptions)
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