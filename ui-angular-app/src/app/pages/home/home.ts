import { Component, ViewChild, ElementRef, OnInit, OnDestroy, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BatchService } from '../../core/services/batch.service';
import { filter, fromEvent, map } from 'rxjs';

interface Feature {
  icon: string;
  title: string;
  description: string;
  link?: string;
  action?: () => void;
}

interface Stat {
  label: string;
  target: number;
  value: number;
}

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule, RouterLink],
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('staggerCards', [
      transition(':enter', [
        query('.card', [
          style({ transform: 'translateY(50px)', opacity: 0 }),
          stagger(150, [
            animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('heroText', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('800ms 200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('heroSection') heroSection: ElementRef | undefined;
  @ViewChild('featuresSection') featuresSection: ElementRef | undefined;

  private destroyRef = inject(DestroyRef);

  isFloating = false;
  particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
  particleInterval: any;

  batchMessage: string | null = null;
  batchErrorMessage: string | null = null;

  features: Feature[] = [
    {
      icon: 'key',
      title: 'Security Service',
      description: 'Gestisci l\'autenticazione e l\'autorizzazione degli utenti.',
      link: '/auth/login'
    },
    {
      icon: 'box',
      title: 'Management & Processing',
      description: 'Gestisci prodotti, clienti e ordini del tuo sistema.',
      link: '/products'
    },
    {
      icon: 'layers',
      title: 'Batch Service',
      description: 'Avvia e monitora job di elaborazione batch asincroni.',
    },
    {
      icon: 'users',
      title: 'User Management',
      description: 'Gestione avanzata di utenti e ruoli (accesso ristretto).',
      link: '/admin/users'
    },
    {
      icon: 'shopping-cart',
      title: 'Orders Overview',
      description: 'Visualizza e traccia lo stato di tutti gli ordini.',
      link: '/orders'
    }
  ];

  stats: Stat[] = [
    { label: 'Servizi Attivi', target: 7, value: 0 },
    { label: 'Utenti Registrati', target: 120, value: 0 },
    { label: 'Transazioni Oggi', target: 540, value: 0 }
  ];

  constructor(private batchService: BatchService) {}

  ngOnInit() {
    this.setupScrollListener();
    this.startParticleAnimation();
    this.startStatsCounter();
  }

  ngOnDestroy() {
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }
  }

  setupScrollListener() {
    fromEvent(window, 'scroll')
      .pipe(
        map(() => window.scrollY > 50),
        filter(isFloating => isFloating !== this.isFloating),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(isFloating => {
        this.isFloating = isFloating;
      });
  }

  startParticleAnimation() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    this.particleInterval = setInterval(() => {
      this.particles.forEach(particle => {
        particle.y -= particle.speed * 0.1;
        if (particle.y < -10) {
          particle.y = 110;
          particle.x = Math.random() * 100;
        }
      });
    }, 100);
  }

  trackByFeature(index: number, feature: Feature): string {
    return feature.title;
  }

  private startStatsCounter() {
    this.stats.forEach(stat => {
      const duration = 1500;
      const intervalTime = 10;
      let current = 0;
      const increment = stat.target / (duration / intervalTime);

      const interval = setInterval(() => {
        if (current < stat.target) {
          current += increment;
          stat.value = Math.min(Math.round(current), stat.target);
        } else {
          clearInterval(interval);
        }
      }, intervalTime);
    });
  }

  scrollToFeatures() {
    this.featuresSection?.nativeElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  trackByParticle(index: number, particle: any) {
    return index;
  }

  startBatchJob(): void {
    this.batchMessage = null;
    this.batchErrorMessage = null;

    this.batchService.runBatch().subscribe({
      next: (response: any) => {
        this.batchMessage = 'Batch Job Started: ' + response;
      },
      error: (error: any) => {
        this.batchErrorMessage = 'Error starting batch job: ' + error.message;
      }
    });
  }
}
