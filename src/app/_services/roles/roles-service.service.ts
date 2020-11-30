import { Injectable } from '@angular/core';
import { importType } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { roles } from '../../_models/roles.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class RoleService {
  //apiURL = 'http://localhost:3000/user';
 deleteURL= 'http://172.18.7.29:3000/maria';
  //deleteURL= 'http://localhost:3000/maria';
  apiURL='http://172.18.7.29:3000/user';
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
  createUser(roles): Observable<roles> {
    console.log(JSON.stringify(roles));
    return this.http.post<roles>(this.apiURL, JSON.stringify(roles), this.httpOptions)
      .pipe(
         retry(1),
      //   catchError(this.handleError)
      )
  };


  

   // HttpClient API get() method => Fetch Roles list
  getRoles(): Observable<roles[]> {
    return this.http.get<roles[]>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // deleteRoles(userid): Observable<roles[]> {
  //   console.log('Delete called', userid);
  //   return this.http.put<roles[]>(this.deleteURL, userid, this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     );
  // }

  deleteRoles(userid) {
    console.log('Delete called', userid);
    var Userid = JSON.stringify
    return this.http.delete(this.deleteURL, userid)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  updateRoles(userid,roles): Observable<roles[]> {
    console.log('updateCustomerDemographic() called');
    return this.http.put<roles[]>(this.apiURL, JSON.stringify(roles), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

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