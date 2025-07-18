// navbar.component.ts
import { Component, inject, OnInit, signal, EventEmitter, Output , Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { AuthResponse } from '../../core/models/auth-response.model';
import { fadeIn } from '../animations/fadeIn';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterModule],
  animations: [fadeIn] 
})
export class NavbarComponent implements OnInit {

  private authService = inject(AuthService);
  
  currentUser: AuthResponse | null = null;
  loading = true;
  isMenuOpen: boolean = false; // Nuovo stato per il menu mobile

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.loading = false;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; // Metodo per aprire/chiudere il menu mobile
  }
}