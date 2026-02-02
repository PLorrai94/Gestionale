import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, SidebarComponent]
})
export class LayoutComponent {
  isSidebarOpen = true;

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
}
