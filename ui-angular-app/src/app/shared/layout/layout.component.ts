import { Component, HostListener } from '@angular/core'; // Importa HostListener
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ProfileSidebarComponent } from '../../pages/products/profile-sidebar/profile-sidebar';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [CommonModule,RouterOutlet, NavbarComponent, FooterComponent, ProfileSidebarComponent]
})
export class LayoutComponent {
  isSidebarOpen = true; // Imposta a 'true' per default se vuoi che sia aperta all'inizio (desktop)

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Questo listener gestirà la chiusura della sidebar quando si clicca sull'overlay scuro
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Se la sidebar è aperta e siamo in mobile, e il click non è sulla sidebar stessa
    if (window.innerWidth <= 768 && this.isSidebarOpen) {
      const sidebar = document.querySelector('app-profile-sidebar');
      const toggleButtonNavbar = document.querySelector('app-navbar .menu-toggle-button'); // Assicurati che la tua navbar abbia un pulsante con questa classe

      if (sidebar && !sidebar.contains(event.target as Node) &&
          toggleButtonNavbar && !toggleButtonNavbar.contains(event.target as Node)) {
        this.isSidebarOpen = false;
      }
    }
  }
}