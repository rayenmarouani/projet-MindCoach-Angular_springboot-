import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../login.service'; // Adjust the path based on your project structure

@Injectable({
  providedIn: 'root',
})



export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const UserLogin = this.loginService.getUsername() !== null;

    if (!UserLogin) {
      this.router.navigate(['/login']);
      return false;
    }

    const loggedInUserId = this.loginService.getUserId(); // Get the logged-in user's ID
    const routeUserId = route.paramMap.get('id'); // Get the user ID from the route parameter

    // Handle the case where routeUserId might be null
    if (!routeUserId || isNaN(+routeUserId)) {
      this.router.navigate(['/client-profile', loggedInUserId]);
      return false;
    }

    const routeUserIdNumber = +routeUserId; // Safely parse it to a number
    if (routeUserIdNumber !== loggedInUserId) {
      this.router.navigate(['/client-profile', loggedInUserId]);
      return false;
    }

    const requiredRole = route.data['role'] as string;
    if (requiredRole && this.loginService.getRole() !== requiredRole) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
