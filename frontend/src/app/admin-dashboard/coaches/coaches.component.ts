import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent {
  coach: any = [];
  searchEmail: string = ''; // For storing input email
  filteredCoach: any = null; // For storing search result
  isSearchActive: boolean = false;
  constructor(private signUp: UserService) {}

  ngOnInit(): void {
    this.loadAllCoaches();
  }

  loadAllCoaches(): void {
    this.signUp.allCoach().subscribe({
      next: (res) => {
        this.coach = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }




  
  closeSearchResult(): void {
    this.filteredCoach = null;
    this.searchEmail = ''; 
  }
  deleteCoach(coach: any): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.signUp.DeleteUser(coach.id).subscribe({
          next: () => {
            Swal.fire({
              title: "Deleted!",
              text: "The coach has been deleted successfully.",
              icon: "success"
            });
            console.log("Coach deleted successfully.");
            this.loadAllCoaches(); // Refresh the coach list
          },
          error: (err) => {
            console.error("Error during deletion:", err);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the coach.",
              icon: "error"
            });
          }
        });
      }
    });
  }
  findCoach(): void {
    if (this.searchEmail.trim() === '') {
      alert('Please enter an email address!');
      return;
    }
  
    this.signUp.findByEmail(this.searchEmail).subscribe({
      next: (res) => {
        this.filteredCoach = res;
        console.log('Coach found:', res);
      },
      error: (err) => {
        console.error('Error finding coach:', err);
        alert('Coach not found!');
      }
    });
  }
  

  
}
