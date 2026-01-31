import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogService } from './confirm-dialog.service';

@Component({
  standalone: true,
  selector: 'app-confirm-dialog',
  template: `
    <div class="overlay" *ngIf="data$ | async as data" (click)="onCancel()">
      <div class="dialog" (click)="$event.stopPropagation()">
        <h3>{{ data.title }}</h3>
        <p>{{ data.message }}</p>
        <div class="dialog-actions">
          <button class="btn btn-secondary" (click)="onCancel()">Annulla</button>
          <button class="btn btn-primary" (click)="onConfirm()">Conferma</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dialog {
      background: var(--color-surface, #2E2E2E);
      padding: 2rem;
      border-radius: var(--radius-card, 1rem);
      box-shadow: 0 8px 30px rgba(0,0,0,0.5);
      max-width: 420px;
      width: 90%;
    }
    h3 {
      color: var(--color-accent, #FFD700);
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }
    p {
      color: var(--color-text, #F0F0F0);
      margin-bottom: 1.5rem;
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }
  `],
  imports: [CommonModule]
})
export class ConfirmDialogComponent {
  private confirmService = inject(ConfirmDialogService);
  data$ = this.confirmService.data$;

  onConfirm() {
    this.confirmService.resolve(true);
  }

  onCancel() {
    this.confirmService.resolve(false);
  }
}
