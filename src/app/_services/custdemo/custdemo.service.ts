import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { customerDemorgaphics } from '../../_models/customerDemographics.model';

@Injectable({ providedIn: 'root'})
export class CustService {
  myHeader;
 
     primeNumber:""
 
 // private currentUserSubject: BehaviorSubject<sbpWaiver>;
  constructor(private http: HttpClient) 
  { 
    //this.currentUserSubject = new BehaviorSubject<sbpWaiver>(JSON.parse(localStorage.getItem('currentUser')));
    this.myHeader = {
      headers: {
        "content-type":"application/json"
      }
    };

  }

  cust(primeNumber) {
    console.log("hiii",primeNumber);
    console.log('custservice Called');
var send_json = '{"primeNumber":' + JSON.stringify(primeNumber) + '}';
var val = primeNumber;
console.log(send_json);
    return this.http.post('http://172.18.7.29:3000/custdemo',{primeNumber: val})
    .pipe(map(primeNumber => {
      return primeNumber;
    }));
  }

}
