import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Per *ngIf, *ngFor
import { RouterLink } from '@angular/router'; // Per routerLink
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';
import { BatchService } from '../../core/services/batch.service'; // Importa il BatchService (assicurati che il percorso sia corretto)
import { filter, fromEvent, map } from 'rxjs'; // Per gestione scroll

// Interfaccia per le funzionalità/microservizi
interface Feature {
  icon: string; // Nome dell'icona Lucide (es. 'key', 'box')
  title: string;
  description: string;
  link?: string; // Opzionale: per routerLink (es. '/products')
  action?: () => void; // Opzionale: per azioni dirette (es. il job batch)
}

// Interfaccia per le statistiche
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
  // Importa i moduli necessari per i template standalone
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
  @ViewChild('featuresSection') featuresSection: ElementRef | undefined; // Usato per lo scroll alla sezione features

  isFloating: boolean = false; // Per la navbar floating
  particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
  particleInterval: any;

  // Variabili per i messaggi del job batch (successo/errore)
  batchMessage: string | null = null;
  batchErrorMessage: string | null = null;

  // Definizione delle feature che rappresentano i microservizi
  features: Feature[] = [
    {
      icon: 'key', // lucide-key
      title: 'Security Service',
      description: 'Gestisci l\'autenticazione e l\'autorizzazione degli utenti.',
      link: '/auth/login' // Esempio: rotta per login/registrazione
    },
    {
      icon: 'box', // lucide-box
      title: 'Management & Processing',
      description: 'Gestisci prodotti, clienti e ordini del tuo sistema.',
      link: '/products' // Esempio: rotta per la lista dei prodotti
    },
    {
      icon: 'layers', // lucide-layers
      title: 'Batch Service',
      description: 'Avvia e monitora job di elaborazione batch asincroni.',
      //action: () => this.startBatchJob() // Chiama il metodo del componente
    },
    {
      icon: 'users', // lucide-users
      title: 'User Management',
      description: 'Gestione avanzata di utenti e ruoli (accesso ristretto).',
      link: '/users' // Esempio: rotta per la gestione utenti
    },
    {
      icon: 'shopping-cart', // lucide-shopping-cart
      title: 'Orders Overview',
      description: 'Visualizza e traccia lo stato di tutti gli ordini.',
      link: '/orders' // Esempio: rotta per la visualizzazione degli ordini
    }
  ];

  // Statistiche (rimaste invariate)
  stats: Stat[] = [
    { label: 'Servizi Attivi', target: 7, value: 0 },
    { label: 'Utenti Registrati', target: 120, value: 0 },
    { label: 'Transazioni Oggi', target: 540, value: 0 }
  ];

  // Iniezione del BatchService
  //constructor(private batchService: BatchService) { }

  ngOnInit() {
    this.setupScrollListener();
    this.startParticleAnimation();
    this.startStatsCounter();
  }

  ngOnDestroy() {
    // Pulisci l'intervallo delle particelle quando il componente viene distrutto
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }
  }

  // Listener per lo scroll per la navbar floating
  setupScrollListener() {
    fromEvent(window, 'scroll')
      .pipe(
        map(() => window.scrollY > 50), // La navbar diventa floating dopo 50px di scroll
        filter(isFloating => isFloating !== this.isFloating) // Solo se lo stato cambia
      )
      .subscribe(isFloating => {
        this.isFloating = isFloating;
      });
  }

  // Logica per l'animazione delle particelle di sfondo
  startParticleAnimation() {
    for (let i = 0; i < 50; i++) { // Numero di particelle
      this.particles.push({
        x: Math.random() * 100, // Posizione X casuale (0-100%)
        y: Math.random() * 100, // Posizione Y casuale (0-100%)
        size: Math.random() * 3 + 1, // Dimensione casuale (1-4px)
        speed: Math.random() * 2 + 1, // Velocità casuale (1-3)
        opacity: Math.random() * 0.5 + 0.1 // Opacità casuale (0.1-0.6)
      });
    }

    this.particleInterval = setInterval(() => {
      this.particles.forEach(particle => {
        particle.y -= particle.speed * 0.1; // Muovi la particella verso l'alto
        if (particle.y < -10) { // Se la particella esce dalla parte superiore, riposizionala in basso
          particle.y = 110;
          particle.x = Math.random() * 100;
        }
      });
    }, 100); // Aggiorna ogni 100ms
  }

  // Funzione trackBy per ottimizzare *ngFor delle particelle (evita ricalcoli inutili)
  trackByFeature(index: number, feature: Feature): string {
    return feature.title; // Assumendo che il titolo sia unico
  }

  // Animazione per il conteggio delle statistiche
  private startStatsCounter() {
    this.stats.forEach((stat, index) => {
      const duration = 1500; // Durata dell'animazione in ms
      const intervalTime = 10; // Frequenza di aggiornamento in ms
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

  // Scrolla alla sezione "features"
  scrollToFeatures() {
    this.featuresSection?.nativeElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  // Scrolla all'inizio della pagina
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  trackByParticle(index: number, particle: any) {
    return index;
  }

  constructor(private batchService: BatchService) {}
  
  // Metodo per avviare il job batch tramite BatchService
  startBatchJob(): void {
  this.batchMessage = null;
  this.batchErrorMessage = null;

  this.batchService.runBatch().subscribe(
    (response: any) => {
      this.batchMessage = 'Batch Job Started: ' + response;
      console.log(this.batchMessage);
    },
    (error: any) => {
      this.batchErrorMessage = 'Error starting batch job: ' + error.message;
      console.error('Error starting batch job:', error);
    }
  );
}
    
}