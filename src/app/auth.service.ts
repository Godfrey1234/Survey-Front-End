import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService{
  
  constructor(public httpClient: HttpClient) { }

  userLogin = "http://localhost:3000/login";
  
  login(newLogin: any) : Observable<any> {
    return this.httpClient.post<any>(this.userLogin, newLogin, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }
}