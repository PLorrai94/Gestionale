// src/app/home/animations.ts
import { trigger, transition, style, animate } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-in', style({ opacity: 1 }))
  ])
]);

export const heroText = trigger('heroText', [
  transition(':enter', [
    style({ transform: 'translateY(20px)', opacity: 0 }),
    animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
  ])
]);
