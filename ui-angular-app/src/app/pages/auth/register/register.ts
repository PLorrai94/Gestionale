import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, RegisterPayload } from '../../../core/services/auth';
import { HttpClientModule } from '@angular/common/http';
import { fadeIn, heroText } from '../../home/animations';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  animations: [fadeIn, heroText],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isFloating = true;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const payload: RegisterPayload = this.registerForm.value;

      this.authService.register(payload).subscribe({
        next: () => {
          this.successMessage = 'Registrazione avvenuta con successo!';
          this.errorMessage = null;
          this.registerForm.reset();
        },
        error: (err: any) => {
          this.errorMessage = 'Errore durante la registrazione.';
          this.successMessage = null;
          console.error('Registration error:', err);
        }
      });
    }
  }
}
