import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  private dataSubject = new BehaviorSubject<ConfirmDialogData | null>(null);
  data$ = this.dataSubject.asObservable();

  private resultSubject!: Subject<boolean>;

  confirm(title: string, message: string): Observable<boolean> {
    this.resultSubject = new Subject<boolean>();
    this.dataSubject.next({ title, message });
    return this.resultSubject.asObservable();
  }

  resolve(result: boolean): void {
    this.resultSubject.next(result);
    this.resultSubject.complete();
    this.dataSubject.next(null);
  }
}
