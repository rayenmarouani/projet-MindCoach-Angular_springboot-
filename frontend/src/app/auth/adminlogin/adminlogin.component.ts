import { Component } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { user } from '../../model/user';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../../service/signup.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',

  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {



  admin = { username: '', password: '' ,id:'',email:''};
errorMessage: any;

  constructor(private loginService: LoginService, private router: Router) {}

  adminEmail=this.loginService.getAdminEmail();



  login() {




        if ( this.adminEmail === this.admin.email ) {
          this.router.navigate([`dashboard`]);



        }
        else{this.errorMessage = 'Invalid username or password. Please try again.';}

  }

}
