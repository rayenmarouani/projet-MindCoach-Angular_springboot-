import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Categorie } from '../../../model/Categorie.model';
import { user } from '../../../model/user';


@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrl: './update-client.component.css'
})
export class UpdateClientComponent {

  categories! : Categorie[];
  updatedCatId! : number;
  currentUser = new user();
  
  
  constructor(private activatedRoute: ActivatedRoute,
              private router :Router,
              private userService: UserService) { }

  ngOnInit(): void {
      this.userService.AllCategories().
      subscribe(cats => {this.categories = cats;
      console.log(cats);
      });

      this.userService.viewuser(this.activatedRoute.snapshot.params['id']).
      subscribe( u => { this.currentUser =  u; 
      this.updatedCatId =   this.currentUser.categorie.idCategorie;
    
    } ) 
    
    }

    Modifie() {
    this.currentUser.categorie = this.categories.find(cat => cat.idCategorie == this.updatedCatId)!;
         this.userService.UpdateUser(this.currentUser).subscribe(u => {
        
          this.router.navigate(['dashboard/clients']); }
      );
  }
  Modify() {
    this.currentUser.categorie = this.categories.find(cat => cat.idCategorie == this.updatedCatId)!;
    
    this.userService.UpdateUser(this.currentUser).subscribe({
      next: () => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // After the success alert is closed, navigate to the dashboard
          this.router.navigate(['dashboard/clients']);
        });
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    });
  }

}