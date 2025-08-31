import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-bg">
      <!-- Animated Background Elements -->
      <div class="background-elements">
        <div class="hearing-icons">
          <div class="floating-icon icon-1">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2C8.134 2 5 5.134 5 9v6c0 3.866 3.134 7 7 7s7-3.134 7-7V9c0-3.866-3.134-7-7-7z"/>
              <circle cx="12" cy="14" r="1"/>
            </svg>
          </div>
          <div class="floating-icon icon-2">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 12h8"/>
            </svg>
          </div>
          <div class="floating-icon icon-3">
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2a6 6 0 0 0-6 6v8a6 6 0 0 0 12 0V8a6 6 0 0 0-6-6z"/>
              <path d="M9 12h6"/>
            </svg>
          </div>
        </div>
        <div class="gradient-orbs">
          <div class="orb orb-1"></div>
          <div class="orb orb-2"></div>
          <div class="orb orb-3"></div>
        </div>
      </div>

      <div class="dashboard-header">
        <div class="welcome-section">
          <div class="logo-container">
            <img src="assets/logo.png" alt="Logo" class="dashboard-logo" />
            <div class="logo-shine"></div>
          </div>
          
          <div class="greeting-container">
            <div class="time-greeting">{{timeGreeting}}</div>
            <h1 class="welcome-title">
              <span class="greeting-text">Bienvenue</span>
              <span class="name-highlight">Madame Boudour</span>
            </h1>
            <p class="dashboard-subtitle">{{motivationalMessage}}</p>
          </div>
        </div>


      <div class="dashboard-actions">
        <div class="card primary-card" (click)="goTo('factures/nouvelle')">
          <div class="card-header">
            <span class="card-icon">✨</span>
            <span class="card-badge">Nouveau</span>
          </div>
          <div class="card-content">
            <h3>Nouvelle Facture</h3>
            <p>Créer une facture pour un patient</p>
          </div>
          <div class="card-arrow">→</div>
        </div>

        <div class="card" (click)="goTo('factures')">
          <div class="card-header">
            <span class="card-icon">📋</span>
          </div>
          <div class="card-content">
            <h3>Gestion des Factures</h3>
            <p>Consulter et gérer vos factures</p>
          </div>
          <div class="card-arrow">→</div>
        </div>

        <div class="card" (click)="goTo('produits')">
          <div class="card-header">
            <span class="card-icon">🦻</span>
          </div>
          <div class="card-content">
            <h3>Appareils Auditifs</h3>
            <p>Gérer votre catalogue de produits</p>
          </div>
          <div class="card-arrow">→</div>
        </div>
      </div>

      </div>
    </div>
  `,
  styles: [`
    .dashboard-bg {
      min-height: 100vh;
      background: linear-gradient(135deg, #fdf2f8 0%, #f8e6ef 25%, #fff 100%);
      position: relative;
      overflow-x: hidden;
      padding: 2rem 1rem;
    }

    /* Animated Background Elements */
    .background-elements {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 0;
    }

    .hearing-icons {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .floating-icon {
      position: absolute;
      color: rgba(198, 16, 86, 0.08);
      animation: gentleFloat 20s ease-in-out infinite;
    }

    .icon-1 {
      top: 10%;
      left: 15%;
      animation-delay: 0s;
    }

    .icon-2 {
      top: 70%;
      right: 20%;
      animation-delay: -7s;
    }

    .icon-3 {
      bottom: 20%;
      left: 10%;
      animation-delay: -14s;
    }

    .gradient-orbs {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .orb {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(198, 16, 86, 0.05) 0%, transparent 70%);
      animation: orbFloat 25s ease-in-out infinite;
    }

    .orb-1 {
      width: 200px;
      height: 200px;
      top: 20%;
      right: 10%;
      animation-delay: 0s;
    }

    .orb-2 {
      width: 150px;
      height: 150px;
      bottom: 30%;
      left: 5%;
      animation-delay: -10s;
    }

    .orb-3 {
      width: 100px;
      height: 100px;
      top: 50%;
      left: 70%;
      animation-delay: -5s;
    }

    /* Main Content */
    .dashboard-header {
      text-align: center;
      margin-bottom: 3rem;
      animation: fadeInDown 1s ease-out;
      position: relative;
      z-index: 10;
    }

    .welcome-section {
      margin-bottom: 2rem;
    }

    .logo-container {
      position: relative;
      display: inline-block;
      margin-bottom: 1.5rem;
    }

    .dashboard-logo {
      width: 120px;
      height: 120px;
      object-fit: contain;
      filter: drop-shadow(0 8px 16px rgba(198, 16, 86, 0.2));
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      padding: 15px;
      position: relative;
      z-index: 2;
    }

    .logo-shine {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 50%;
      background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%);
      animation: logoShine 4s ease-in-out infinite;
    }

    .time-greeting {
      color: #c61056;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .welcome-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 1rem 0;
      line-height: 1.2;
    }

    .greeting-text {
      color: #2c3e50;
      display: block;
      font-size: 1.8rem;
    }

    .name-highlight {
      color: #c61056;
      display: block;
      background: linear-gradient(135deg, #c61056, #a50e48);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      position: relative;
    }

    .cabinet-info {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(198, 16, 86, 0.1);
      color: #c61056;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      margin-bottom: 1rem;
      border: 1px solid rgba(198, 16, 86, 0.2);
    }

    .location-icon {
      width: 18px;
      height: 18px;
    }

    .dashboard-subtitle {
      color: #64748b;
      font-size: 1.2rem;
      font-weight: 500;
      margin: 0;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* Quick Stats */
    .quick-stats {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin: 2rem 0;
      flex-wrap: wrap;
    }

    .stat-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 4px 20px rgba(198, 16, 86, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.8);
      min-width: 180px;
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
    }

    .stat-icon {
      font-size: 2rem;
    }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-number {
      font-size: 1.5rem;
      font-weight: 700;
      color: #c61056;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #64748b;
      font-weight: 500;
    }

    /* Dashboard Actions */
    .dashboard-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1000px;
      margin: 0 auto 3rem auto;
      animation: fadeInUp 1.2s ease-out;
      position: relative;
      z-index: 10;
    }

    .card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(15px);
      border-radius: 20px;
      padding: 2rem;
      cursor: pointer;
      box-shadow: 
        0 8px 32px rgba(198, 16, 86, 0.1),
        0 4px 16px rgba(0, 0, 0, 0.05);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(255, 255, 255, 0.8);
      position: relative;
      overflow: hidden;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #c61056, #a50e48);
      transform: translateX(-100%);
      transition: transform 0.5s ease;
    }

    .card:hover::before {
      transform: translateX(0);
    }

    .card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 
        0 16px 40px rgba(198, 16, 86, 0.15),
        0 8px 24px rgba(0, 0, 0, 0.1);
    }

    .primary-card {
      background: linear-gradient(135deg, rgba(198, 16, 86, 0.05) 0%, rgba(255, 255, 255, 0.95) 100%);
      border: 2px solid rgba(198, 16, 86, 0.2);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .card-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .card-badge {
      background: #c61056;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .card-content h3 {
      color: #2c3e50;
      font-size: 1.4rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
    }

    .card-content p {
      color: #64748b;
      font-size: 1rem;
      margin: 0;
      line-height: 1.5;
    }

    .card-arrow {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      font-size: 1.5rem;
      color: #c61056;
      transition: transform 0.3s ease;
    }

    .card:hover .card-arrow {
      transform: translateX(5px);
    }

    /* Schedule Preview */
    .schedule-preview {
      max-width: 800px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(15px);
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(198, 16, 86, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.8);
      animation: fadeInUp 1.4s ease-out;
      position: relative;
      z-index: 10;
    }

    .schedule-preview h3 {
      color: #2c3e50;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 1.5rem 0;
      text-align: center;
    }

    .schedule-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .schedule-item {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1rem;
      background: rgba(248, 250, 252, 0.8);
      border-radius: 12px;
      border-left: 4px solid #c61056;
    }

    .time-slot {
      background: #c61056;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      min-width: 70px;
      text-align: center;
    }

    .appointment-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .patient-name {
      font-weight: 600;
      color: #2c3e50;
    }

    .appointment-type {
      font-size: 0.9rem;
      color: #64748b;
      background: rgba(198, 16, 86, 0.1);
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
      display: inline-block;
      width: fit-content;
    }

    /* Animations */
    @keyframes gentleFloat {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.06;
      }
      50% {
        transform: translateY(-20px) rotate(180deg);
        opacity: 0.12;
      }
    }

    @keyframes orbFloat {
      0%, 100% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(30px, -30px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
    }

    @keyframes logoShine {
      0%, 100% {
        opacity: 0;
        transform: translateX(-100%);
      }
      50% {
        opacity: 1;
        transform: translateX(100%);
      }
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .dashboard-bg {
        padding: 1rem 0.5rem;
      }

      .welcome-title {
        font-size: 2rem;
      }

      .greeting-text {
        font-size: 1.4rem;
      }

      .dashboard-actions {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .quick-stats {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .schedule-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .floating-icon, .orb {
        display: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  timeGreeting: string = '';
  motivationalMessage: string = '';
  
  todayStats = {
    invoices: 8,
    patients: 6,
    revenue: 2450
  };

  constructor(private router: Router) {}

  ngOnInit() {
    
    this.setMotivationalMessage();
  }



  goTo(path: string) {
  this.router.navigate([`/app/${path}`]);
}

  private setMotivationalMessage() {
    const messages = [
      'Votre expertise fait la différence dans la vie de vos patients chaque jour ✨',
    ];
    
    const today = new Date().getDate();
    this.motivationalMessage = messages[today % messages.length];
  }
}