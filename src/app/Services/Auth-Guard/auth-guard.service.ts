import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  canActivate: CanActivateFn = () => {
    const email = localStorage.getItem('email');
    if(email) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
