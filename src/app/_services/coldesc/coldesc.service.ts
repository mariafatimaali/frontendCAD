import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { collateral } from '../../_models/collateral.model';

@Injectable({ providedIn: 'root'})
export class ColdescService {
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
  // dealType: "",
  // dealBranch: "",
  // dealReference: "",
  // accountNumber: ""
  val :any[];
  cust(collateralType,collateralReference) {
    console.log(JSON.stringify(collateral))
    var json=    {  "collateralType": collateralType,"collateralReference": collateralReference }
   // console.log("hiii",primeNumber);
    //console.log('custservice Called');
//var send_json = '{"collateralType":' + JSON.stringify(collateralTypeDescription) + ' "collateralReference":' + JSON.stringify(collateralReference) + ' "dealType":' + JSON.stringify(dealType) + ' "dealBranch":' + JSON.stringify(dealBranch) + ' "dealReference":' + JSON.stringify(dealReference) + ' "accountNumber":' + JSON.stringify(accountNumber) +'}';
//var val = collateralTypeDescription,collateralReference,dealType,dealBranch,dealReference,accountNumber;
//var val1 = collateralReference
//console.log(val);
   // return this.http.post('http://172.18.7.29:3000/coldesc',collateral)
    return this.http.post('http://172.18.7.29:3000/coldesc',json)
    .pipe(map(primeNumber => {
      return primeNumber;
    }));
  }

}
