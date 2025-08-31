import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="app-container">
      <aside class="sidebar">
        <ul>
          <li><a routerLink="/app/factures/nouvelle" routerLinkActive="active">➕ Nouvelle facture</a></li>
          <li><a routerLink="/app/factures" routerLinkActive="active">📑 Liste factures</a></li>
          <li><a routerLink="/app/produits" routerLinkActive="active">📦 Produits</a></li>
        </ul>
      </aside>

      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container { display: flex; height: 100vh; }
    .sidebar { width: 220px; background: #f5f5f5; padding: 1rem; }
    .sidebar ul { list-style: none; padding: 0; }
    .sidebar li { margin-bottom: 10px; }
    .content { flex: 1; padding: 1rem; overflow-y: auto; }
    a.active { font-weight: bold; color: #c61056; }
  `]
})
export class AppLayoutComponent {}
