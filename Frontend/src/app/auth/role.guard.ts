import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  
  canActivate(){
      if (this.authService.isAdmin() && this.authService.isLoggedIn()) {
        return true;
      } else {
        alert('Unauthorized !')
     
        return false;
      }
    
}
}