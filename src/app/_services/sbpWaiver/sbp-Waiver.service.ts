import { Injectable } from '@angular/core';
import { importType } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { sbpWaiver } from '../../_models/sbpWaiver.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class sbpWaiverService {
  //apiURL = 'http://localhost:3000/sbpWaiver';
  url='http://localhost:3000/v1/wsdl/encryptQuery/';
 apiURL='http://172.18.7.29:3000/sbpWaiver';
  sbpWaiverdata: any;
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
  createCustomerDemorgaphics(sbpWaiver): Observable<sbpWaiver> {
    console.log(JSON.stringify(sbpWaiver));
    return this.http.post<sbpWaiver>(this.apiURL, JSON.stringify(sbpWaiver), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };
  //doc service
  // docservice(sbpWaiver): Observable<sbpWaiver> {
  //   console.log(JSON.stringify(sbpWaiver));
  //   return this.http.post<sbpWaiver>(this.url, JSON.stringify(sbpWaiver), this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     )
  // };
  // post(relativePath: string, model: any): Observable<object> {
  //   //this.loaderService.show();
  //   // let headers = new HttpHeaders();
  //   // headers = headers.set('Content-Type', 'application/json');
 
  //   return this.httpClient.post(this.url + relativePath, model, {
  //   //  headers: headers
  //   }).pipe(
  //     tap(data => {
  //       //this.loaderService.hide(); 
  //     })
  //   );
  // }

  // HttpClient API get() method => Fetch customerDemorgaphics list
  getCustomerDemographics(): Observable<sbpWaiver> {
    return this.http.get<sbpWaiver>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() single data method => Fetch employee
  // getCustomerDemographic(primeNumber): Observable<sbpWaiver> {
  //   console.log("this called.............")
  //   console.log(primeNumber)
  //   return this.http.get<sbpWaiver>(this.apiURL + '/' +primeNumber)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     )
  // };

    // HttpClient API get() single data method => Fetch employee
    getCustomerDemographic(primeNumber): Observable<sbpWaiver> {
      return this.http.get<sbpWaiver>(this.apiURL + '/' + primeNumber)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    };
  
    // HttpClient API get() single data method => Fetch employee
    getCustomerDemographicc(primeNumber){
      console.log("this called.............")
      console.log(primeNumber)
      return this.http.get<sbpWaiver>(this.apiURL + '/' +':'+primeNumber)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    };
  

  setCustomerDemographicData(data) {
    return this.sbpWaiverdata = data;
  }
  getCustomerDemographicData() {
    return this.sbpWaiverdata;
  }

  // HttpClient API put() method => Update employee
  updateCustomerDemorgaphics(primeNumber,sbpWaiver): Observable<sbpWaiver> {
    console.log('updateCustomerDemographic() called');
    return this.http.put<sbpWaiver>(this.apiURL + '/' + sbpWaiver.primeNumber, JSON.stringify(sbpWaiver), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  deleteCustomersdemographic(primeNumber){
    var p_json = '{"primeNumber":"'+ primeNumber + '"}';
    console.log(JSON.stringify(primeNumber));
    return this.http.put<sbpWaiver>(this.apiURL , p_json, this.httpOptions)
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