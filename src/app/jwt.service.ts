import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post<{ token: string }>('http://localhost:3000/login', { email, password }).pipe(tap(res => {
      localStorage.setItem('token', res.token);
    }))
  }

  register(email: string, password: string) {
    return this.httpClient.post<{ token: string }>('http://localhost:3000/login', { email, password }).pipe(tap(res => {
      this.login(email, password)
    }))
  }

  logout() {
    localStorage.removeItem('token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
