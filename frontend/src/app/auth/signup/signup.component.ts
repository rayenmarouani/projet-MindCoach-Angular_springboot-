import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../model/Categorie.model';
import { user } from '../../model/user';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  newUser  = new user();
  categories!: Categorie[];
  newIdCat!: number;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    Swal.fire({
      title: "Join Our Coaching Team ?  \n Want to inspire others? Become a MindCoach today",
      icon: "question",
      iconHtml: "؟",
      confirmButtonText: "Yes",
      
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
      
        this.router.navigate(['/coachrequest']); 
      }
    });

    this.userService.AllCategories().subscribe(cats => {
      this.categories = cats;
      console.log(cats);
    });
  }

  adduser() {
    this.newUser .categorie = this.categories.find(cat => cat.idCategorie == this.newIdCat)!;
    this.userService.AddUser (this.newUser ).subscribe(u => {
      console.log('User  registered:', u);
      this.router.navigate(['/login']);
    }, error => {
      console.error('Error registering user', error);
    });
  }
}

