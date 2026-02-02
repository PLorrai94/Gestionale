import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchService } from '../../core/services/batch.service';
import { NotificationService } from '../../shared/notification/notification.service';

@Component({
  selector: 'app-batch',
  imports: [CommonModule],
  templateUrl: './batch.html',
  styleUrl: './batch.css'
})
export class Batch {
  private batchService = inject(BatchService);
  private notificationService = inject(NotificationService);
  
  isRunning = false;
  lastRunTime: Date | null = null;
  
  runBatchJob() {
    this.isRunning = true;
    this.batchService.runBatch().subscribe({
      next: (response) => {
        this.isRunning = false;
        this.lastRunTime = new Date();
        this.notificationService.show('Batch job started successfully');
        // Batch job started successfully
      },
      error: (error) => {
        this.isRunning = false;
        this.notificationService.show('Failed to start batch job: ' + (error.error?.message || error.message || 'Unknown error'));
        // Error starting batch job
      }
    });
  }
  
  getFormattedLastRunTime(): string {
    if (!this.lastRunTime) return 'Never';
    return this.lastRunTime.toLocaleString();
  }
}
