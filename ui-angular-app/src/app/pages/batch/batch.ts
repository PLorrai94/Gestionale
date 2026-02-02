import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchService } from '../../core/services/batch.service';
import { NotificationService } from '../../shared/notification/notification.service';

@Component({
  standalone: true,
  selector: 'app-batch',
  templateUrl: './batch.html',
  styleUrls: ['./batch.css'],
  imports: [CommonModule]
})
export class Batch {
  private batchService = inject(BatchService);
  private notificationService = inject(NotificationService);

  loading = false;
  lastResult: string | null = null;
  lastError: string | null = null;

  startBatchJob(): void {
    this.loading = true;
    this.lastResult = null;
    this.lastError = null;

    this.batchService.runBatch().subscribe({
      next: (response) => {
        this.lastResult = typeof response === 'string' ? response : JSON.stringify(response);
        this.notificationService.show('Batch job started successfully.', 'success');
        this.loading = false;
      },
      error: (error) => {
        this.lastError = error.error?.message || error.message || 'Failed to start batch job.';
        this.notificationService.show(this.lastError!, 'error');
        this.loading = false;
      }
    });
  }
}
