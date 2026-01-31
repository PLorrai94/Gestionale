import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, AppNotification } from './notification.service';

@Component({
  standalone: true,
  selector: 'app-notification',
  template: `
    <div class="notification-container">
      <div
        *ngFor="let n of notifications$ | async"
        class="notification"
        [class.success]="n.type === 'success'"
        [class.error]="n.type === 'error'"
        [class.warning]="n.type === 'warning'"
        [class.info]="n.type === 'info'"
        (click)="dismiss(n.id)">
        {{ n.message }}
      </div>
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-width: 400px;
    }
    .notification {
      padding: 0.75rem 1.25rem;
      border-radius: var(--radius-general, 0.25rem);
      color: #fff;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      animation: slideIn 0.3s ease-out;
    }
    .success { background-color: #2ecc71; }
    .error { background-color: #e74c3c; }
    .warning { background-color: #f39c12; }
    .info { background-color: #3498db; }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `],
  imports: [CommonModule]
})
export class NotificationComponent {
  private notificationService = inject(NotificationService);
  notifications$ = this.notificationService.notifications$;

  dismiss(id: number) {
    this.notificationService.dismiss(id);
  }
}
