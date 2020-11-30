import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sbpWaiver } from '../../_models/sbpWaiver.model';

@Injectable({ providedIn: 'root'})
export class DocService {
  myHeader;
 qData={
     primeNumber:""
 }
  private currentUserSubject: BehaviorSubject<sbpWaiver>;
  constructor(private http: HttpClient) 
  { 
    //this.currentUserSubject = new BehaviorSubject<sbpWaiver>(JSON.parse(localStorage.getItem('currentUser')));
    this.myHeader = {
      headers: {
        "content-type":"application/json"
      }
    };

  }


  doc(primeNumber) {
    console.log('docservice Called');
    this.qData.primeNumber = primeNumber;
    console.log(this.qData);
        console.log("primeNumber",this.qData.primeNumber);
    console.log("primeNumber",primeNumber)
   // apiURL='http://172.18.7.29:3000/branch';
    return this.http.post('http://172.18.7.29:3000/v1/wsdl/encryptQuery/', this.qData)
   // return this.http.post('http://localhost:3000/login', this.user)
    .pipe(map(primeNumber => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
     // localStorage.setItem('isLoggedin', 'true');
      return primeNumber;
    }));
  }

}
