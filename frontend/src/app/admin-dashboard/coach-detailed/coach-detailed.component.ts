import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coach-detailed',
  templateUrl: './coach-detailed.component.html',
  styleUrl: './coach-detailed.component.css'
})
export class CoachDetailedComponent {
  id:any
  coachDetails: any;
  constructor(private userService: UserService,private act:ActivatedRoute){}


  ngOnInit():void{
    this.id=this.act.snapshot.paramMap.get('id')


    this.userService.coachID(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.coachDetails = data; // Assign the data to coachDetails
      },
      error: (err) => {
        console.error('Error fetching coach details:', err);
      }
    });
  }


}
