import { Component } from '@angular/core';
import { user } from '../../../model/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.css'
})
export class DetailClientComponent {
  userDetails!: user;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get the user ID from the route
    const userId = Number(this.route.snapshot.paramMap.get('id'));

    if (userId) {
      // Fetch user details using the ID
      this.userService.viewuser(userId).subscribe({
        next: (user) => {
          this.userDetails = user;
          console.log('User Details:', this.userDetails);
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
        }
      });
    } else {
      console.error('Invalid user ID');
    }
  }
}

