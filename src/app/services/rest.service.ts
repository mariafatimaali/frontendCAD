import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  baseUri:string = 'http://172.18.7.29:3000/users';
  //baseUri:string = 'http://localhost:3000/users';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  roledata : any
 customerDemographicdata: any;

  constructor(private http: HttpClient) { }

  setRoleData(someInput)
  {
    this.roledata = someInput;
  }
  getRoleData()
  {
    console.log(this.roledata);
  }


  // Create
  createEmployee(data): Observable<any> {
    let url = `${this.baseUri}/`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  setCustomerDemographicData(data) {
    return this.customerDemographicdata = data;
  }
  getCustomerDemographicData() {
    return this.customerDemographicdata;
  }
  // Get all employees
  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUri}`);
  }

  // Get employee
  getEmployee(id): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update employee
  updateEmployee(id, data): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete employee
  deleteEmployee(id): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}