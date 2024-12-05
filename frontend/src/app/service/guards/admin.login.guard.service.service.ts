import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginGuardServiceService {


    constructor(private loginService: LoginService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      // Check if the user is logged in and if their email matches the admin's email.
    if (this.loginService.getAdminEmail()) {
      return true;
    } else {
      // Redirect to login page if not authorized
      this.router.navigate(['/loginadmin']);
      return false;
    }
  }
}

