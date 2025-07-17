// src/app/pages/dashboard/dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  template: `
    <div class="container">
      <h2>Benvenuto nella tua Dashboard!</h2>
      <p>Gestisci i tuoi microservizi qui.</p>
      <button class="btn btn-primary" (click)="logout()">Logout</button>
    </div>
  `,
  styles: [`
    h2 { margin-top: 2rem; color: var(--color-accent); }
    .container { padding: 2rem; }
    .btn { margin-top: 1.5rem; }
  `]
})
export class DashboardComponent {
  logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/auth/login';
  }
}
