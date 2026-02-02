// src/app/pages/profile/user-profile.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { AuthResponse } from '../../core/models/auth-response.model';

@Component({
  standalone: true,
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class UserProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  user: AuthResponse | null = null;
  profileForm!: FormGroup;
  isEditing = false;

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;

    this.profileForm = this.fb.group({
      username: [this.user?.username || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]]
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.user) {
      // Reset form to original data
      this.profileForm.setValue({
        username: this.user.username,
        email: this.user.email
      });
    }
  }

  saveChanges(): void {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.value;
      // TODO: implement save to server
      this.toggleEdit();
    }
  }
}
