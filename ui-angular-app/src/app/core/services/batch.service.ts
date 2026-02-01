import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  private http = inject(HttpClient);

  runBatch(): Observable<any> {
    return this.http.post('/api/batch/start-process-orders-job', {}).pipe(
      catchError(error => {
        console.error('Batch service error:', error);
        throw error;
      })
    );
  }
}
