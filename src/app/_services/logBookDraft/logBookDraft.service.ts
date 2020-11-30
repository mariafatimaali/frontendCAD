import { Injectable } from '@angular/core';
import { importType } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { logBookDraft } from '../../_models/logbookDraft.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class logBookDraftService {
  //apiURL = 'http://localhost:3000/cplogbookdraft';
  apiURL='http://172.18.7.29:3000/cplogbookdraft';
  logBookDraftdata: any;
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
  createlogbookdrafts(logbookdraft): Observable<logBookDraft> {
    console.log(JSON.stringify(logbookdraft));
    return this.http.post<logBookDraft>(this.apiURL, JSON.stringify(logbookdraft), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() method => Fetch customerDemorgaphics list
  getlogBookDrafts(): Observable<logBookDraft> {
    return this.http.get<logBookDraft>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // HttpClient API get() single data method => Fetch employee
  getlogBookDraft(primenumber): Observable<logBookDraft> {
    return this.http.get<logBookDraft>(this.apiURL + '/' + primenumber)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };


  setlogBookDraft(data) {
    return this.logBookDraftdata = data;
  }
  getlogBookDraftData() {
    return this.logBookDraftdata;
  }

  // HttpClient API put() method => Update employee
  updatelogBookDrafts(primenumber,logBookDrafts): Observable<logBookDraft> {
    console.log('updateCustomerDemographic() called');
    return this.http.put<logBookDraft>(this.apiURL + '/' + logBookDrafts.primenumber, JSON.stringify(logBookDrafts), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  deletelogBookDraft(primenumber){
  console.log(primenumber);
    return this.http.delete<logBookDraft>(this.apiURL + '/' + primenumber, this.httpOptions)
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