import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private AuthService: AuthService, public _router: Router){

  }
  
  canActivate(): boolean {
    if (this.AuthService.loggedIn()) {
      return true;
    }
    else{
      window.alert('Permission denied please login');
      this._router.navigate(['/login']);
      return false;
    }
  }
}
