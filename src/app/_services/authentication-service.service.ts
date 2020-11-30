import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root'})
export class AuthenticationServiceService {
  myHeader;
  user = {
    username : "",
    password : ""
  }
  private currentUserSubject: BehaviorSubject<User>;
  constructor(private http: HttpClient) 
  { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.myHeader = {
      headers: {
        "content-type":"application/json"
      }
    };

  }


  login(username,password) {
    this.user.username = username;
    this.user.password = password;
    //console.log(JSON.stringify(this.user));
   // apiURL='http://172.18.7.29:3000/branch';
    return this.http.post('http://172.18.7.29:3000/login', this.user)
   // return this.http.post('http://localhost:3000/login', this.user)
    .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('isLoggedin', 'true');
      return user;
    }));
  }

}
