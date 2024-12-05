import { Component } from '@angular/core';
import { FormControl , FormBuilder , FormGroup,Validator, Validators } from '@angular/forms';
import { UserService} from  '../../service/signup.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-coachjoin',
  templateUrl: './coachjoin.component.html',
  styleUrl: './coachjoin.component.css',
  
})
export class CoachjoinComponent {
 
  coachRequest:FormGroup
  constructor(private fb:FormBuilder , private signUp:UserService ){
     let controls={
      "name":new FormControl('',[Validators.required]),
      "prenom":new FormControl('',[Validators.required]),
      "username":new FormControl('',[Validators.required]),
      "password":new FormControl('',[Validators.required]),
      "email":new FormControl('',[Validators.required ,Validators.email]),
      "nbTel":new FormControl('',[Validators.required,Validators.pattern(/^\d+$/)]),
      "age":new FormControl('',[Validators.required,Validators.pattern(/^\d+$/)]),
      "expertise":new FormControl('',[Validators.required]),
      "yearsOfExperience":new FormControl('',[Validators.required,Validators.pattern(/^\d+$/)]),
      "qualifications":new FormControl('',[Validators.required]),
      "motivationmsg":new FormControl('',[Validators.required]),





     }
    this.coachRequest=this.fb.group(controls);
  }

  send(){
    const coachData = {
      ...this.coachRequest.value,
      role: 'Coach' 
    };;
    this.signUp.CoachRequest(coachData).subscribe({
      next: 
      (res) =>{ 
      
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "We will contact you shortly!",
          showConfirmButton: false,
          timer: 1500
        });
        
      },
      error:(err)=>{
        console.log(err)

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }

    })

    
  }

}
