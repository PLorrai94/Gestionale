import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NotificationComponent } from '../notification/notification.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../core/services/auth';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    NotificationComponent,
    ConfirmDialogComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule
  ]
})
export class LayoutComponent {
  isSidebarOpen = true;
  private router = inject(Router);
  private authService = inject(AuthService);

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (window.innerWidth <= 768 && this.isSidebarOpen) {
      const sidebar = document.querySelector('app-sidebar');
      const toggleButtonNavbar = document.querySelector('app-navbar .menu-toggle-button');

      if (sidebar && !sidebar.contains(event.target as Node) &&
          toggleButtonNavbar && !toggleButtonNavbar.contains(event.target as Node)) {
        this.isSidebarOpen = false;
      }
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get currentUser(): any {
    return this.authService.currentUserValue;
  }

  logout(): void {
    this.authService.logout();
  }

  onMobileClose(): void {
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = false;
    }
  }
}
