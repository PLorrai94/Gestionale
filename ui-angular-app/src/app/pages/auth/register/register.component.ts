import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { UserRegistrationRequest } from '../../../core/models/user-registration-request.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]$/)
      ]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', [Validators.maxLength(50)]],
      lastName: ['', [Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.pattern(/^$|^\+?[0-9\s\-()]{7,20}$/)]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const request: UserRegistrationRequest = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      firstName: this.registerForm.value.firstName || undefined,
      lastName: this.registerForm.value.lastName || undefined,
      phoneNumber: this.registerForm.value.phoneNumber || undefined
    };

    this.authService.register(request).subscribe({
      next: (response) => {
        // User is automatically logged in by the auth service
        this.router.navigate(['/dashboard']);
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || error.message || 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }
}
