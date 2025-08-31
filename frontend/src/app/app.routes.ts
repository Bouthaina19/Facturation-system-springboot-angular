// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent) },
  {
    path: 'app',
    canActivate: [authGuard],
    children: [
      { path: 'factures/nouvelle', loadComponent: () => import('./components/facture-form/facture-form').then(m => m.FactureForm) },
      { path: 'factures', loadComponent: () => import('./components/facture-list/facture-list').then(m => m.FactureListeComponent) },
      { path: 'produits', loadComponent: () => import('./components/produits/produits').then(m => m.Produits) },
      { path: '', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) } // ✅ par défaut
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' }
];
