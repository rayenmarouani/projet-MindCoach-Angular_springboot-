import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-coach',
  templateUrl: './update-coach.component.html',
  styleUrl: './update-coach.component.css'
})
export class UpdateCoachComponent {
  updateCoachForm: FormGroup;
  id: any;
  coachDetails: any

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private act: ActivatedRoute,
    private router: Router
  ) {
    this.updateCoachForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      nbTel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      expertise: ['', Validators.required],
      status: [true, Validators.required]
    });
    this.id = 0;
  }

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

  onSubmit(): void {
    if (this.updateCoachForm.invalid) {
      return;
    }

    const updatedCoach = this.updateCoachForm.value;

    this.userService.UpdateCoach(this.id, updatedCoach).subscribe({
      next: () => {
        Swal.fire('Success', 'Coach information updated successfully!', 'success');
        this.router.navigate(['/dashboard/coachs']);
      },
      error: (err) => {
        console.error('Failed to update coach:', err);
        Swal.fire('Error', 'Failed to update coach!', 'error');
      }
    });
  }

  cancelUpdate(): void {
    this.router.navigate(['/dashboard/coachs']);
  }
}


