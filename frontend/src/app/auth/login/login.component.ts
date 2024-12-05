import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { user } from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { username: '', password: '' ,id:''};
  errorMessage: string | null = null; // Added errorMessage property

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.user).subscribe(
      (response) => {
        console.log('Login success:', response);

        // Save user data in the service
        this.loginService.saveUserData(response);

        // Navigate based on user role
        if (response.role === 'USER') {
          this.router.navigate([`client-profile/${response.id}`]);
          return response.id;
        } else if (response.role === 'ADMIN') {
          this.router.navigate(['/loginadmin']);
        } else {
          this.router.navigate(['']);
        }

        // Clear any previous error message
        this.errorMessage = null;
      },
      (error) => {
        console.error('Login error:', error);
        // Set the error message to be displayed in the template
        this.errorMessage = 'Invalid username or password. Please try again.';
      }
    );
  }
}
