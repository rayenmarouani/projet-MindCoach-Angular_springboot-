import { Component } from '@angular/core';
import { user } from '../../model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent {
  user: user = {
    id: 0,
    username: '',
    password: '',
    email: '',
    nbTel: 0,
    role: '',
    age: 0,
    status: false,
    categorie: {} as any,
  }; // Initialisation pour éviter les erreurs null
  isEditMode: boolean = false;
  profileForm: FormGroup;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      nbTel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      age: ['', [Validators.required, Validators.min(18)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = +params['id'];
      if (userId) {
        this.loadUserProfile(userId);
      } else {
        console.error('Invalid or missing user ID');
      }
    });
  }

  loadUserProfile(userId: number): void {
    this.userService.getUserProfile(userId).subscribe({
      next: (data) => {
        this.user = data;
        this.profileForm.patchValue(data);
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
      },
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.value;
      this.userService.updateUserProfile(this.user.id, updatedData).subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          this.user = { ...this.user, ...updatedData };
          this.isEditMode = false;
        },
        error: (err) => {
          console.error('Error updating profile:', err);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
  deleteUser(): void {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      this.userService.deleteUserProfile(this.user.id).subscribe({
        next: (response) => {
          console.log('Account deleted successfully');
          this.router.navigate(['/login']); // Rediriger vers la page de connexion après suppression
        },
        error: (err) => {
          console.error('Error deleting account:', err);
        }
      });
    }
  }















}

