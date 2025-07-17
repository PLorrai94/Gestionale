import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { AuthResponse } from '../../core/models/auth-response.model';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);

  currentUser: AuthResponse | null = null;
  loading = true;

  ngOnInit(): void {
    // Subscribing explicitly (instead of just async pipe) to ensure immediate value availability
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.loading = false;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
