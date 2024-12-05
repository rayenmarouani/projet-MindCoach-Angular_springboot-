import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-coach-pending',
  templateUrl: './coach-pending.component.html',
  styleUrl: './coach-pending.component.css'
})
export class CoachPendingComponent {

  pending:any

  constructor(private userService: UserService){

  }
   

  ngOnInit():void{
    this.userService.allPending().subscribe({
      next:(data)=>{
        this.pending=data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  

  }
  
}
