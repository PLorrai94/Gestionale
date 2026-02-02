import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent {
  private authService = inject(AuthService);

  @Input() collapsed: boolean = false;
  @Output() toggle = new EventEmitter<void>();

  get isAdmin(): boolean {
    return this.hasAnyRole(['ROLE_ADMIN', 'ADMIN']);
  }

  get isPrivileged(): boolean {
    return this.hasAnyRole(['ROLE_ADMIN', 'ADMIN', 'ROLE_MANAGER', 'MANAGER']);
  }

  private hasAnyRole(allowedRoles: string[]): boolean {
    const user = this.authService.currentUserValue;
    if (!user?.token) return false;
    try {
      const payload = JSON.parse(atob(user.token.split('.')[1]));
      const roles: string[] = payload.roles || [];
      return allowedRoles.some(role => roles.includes(role));
    } catch {
      return false;
    }
  }

  onToggleClick() {
    this.toggle.emit();
  }
}
