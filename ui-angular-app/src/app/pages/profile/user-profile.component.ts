import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { UserService } from '../../core/services/user.service';
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
  private userService = inject(UserService);

  user: AuthResponse | null = null;
  profileForm!: FormGroup;
  isEditing = false;
  saveMessage: string | null = null;
  saveError: string | null = null;

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;

    this.profileForm = this.fb.group({
      username: [this.user?.username || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]]
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.saveMessage = null;
    this.saveError = null;
    if (!this.isEditing && this.user) {
      this.profileForm.setValue({
        username: this.user.username,
        email: this.user.email
      });
    }
  }

  saveChanges(): void {
    if (this.profileForm.valid && this.user?.id) {
      const updatedData = this.profileForm.value;
      this.userService.update(this.user.id, updatedData).subscribe({
        next: () => {
          const stored = localStorage.getItem('currentUser');
          if (stored) {
            const current = JSON.parse(stored);
            current.username = updatedData.username;
            current.email = updatedData.email;
            localStorage.setItem('currentUser', JSON.stringify(current));
            this.authService.refreshUserFromStorage();
          }
          this.user = this.authService.currentUserValue;
          this.saveMessage = 'Profilo aggiornato con successo.';
          this.isEditing = false;
        },
        error: (err) => {
          this.saveError = 'Errore durante il salvataggio.';
        }
      });
    }
  }
}
