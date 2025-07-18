import { Component, Input, Output, EventEmitter } from '@angular/core'; // Aggiungi Input e Output
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importa RouterModule per routerLink

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.html',
  styleUrls: ['./profile-sidebar.css'],
  standalone: true,
  imports: [CommonModule, RouterModule] // Aggiungi RouterModule qui
})
export class ProfileSidebarComponent {
  @Input() collapsed: boolean = false; // Input per ricevere lo stato dal padre
  @Output() toggle = new EventEmitter<void>(); // Output per notificare il padre

  // Rimuovi il segnale 'collapsed' interno e il metodo 'toggleSidebar()'
  // collapsed = signal(false);
  // toggleSidebar() {
  //   this.collapsed.update(c => !c);
  // }

  onToggleClick() {
    this.toggle.emit(); // Emetti l'evento quando il pulsante interno viene cliccato
  }
}