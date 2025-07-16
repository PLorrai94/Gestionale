import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ProductsComponent } from './products/products';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'auth/register', loadComponent: () =>
      import('./pages/auth/register/register')
        .then(m => m.RegisterComponent)
  },
  { path: '**', redirectTo: '' }
];
