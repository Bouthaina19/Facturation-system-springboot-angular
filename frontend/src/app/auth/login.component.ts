import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <!-- Advanced Animated Background -->
      <div class="background-wrapper">
        <div class="gradient-bg"></div>
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
          <div class="shape shape-5"></div>
          <div class="shape shape-6"></div>
        </div>
        <div class="wave-animation">
          <svg viewBox="0 0 1200 300" class="wave">
            <path d="M0,100 C300,200 400,50 600,150 C800,250 900,100 1200,200 L1200,300 L0,300 Z" class="wave-path wave-1"/>
            <path d="M0,150 C300,250 500,100 700,200 C900,300 1000,150 1200,250 L1200,300 L0,300 Z" class="wave-path wave-2"/>
            <path d="M0,200 C200,300 600,150 800,250 C1000,350 1100,200 1200,300 L1200,300 L0,300 Z" class="wave-path wave-3"/>
          </svg>
        </div>
      </div>
      
      <div class="login-content">
        <form class="login-card" (ngSubmit)="login()">
          <div class="login-header">
            <div class="logo-container">
              <div class="logo-glow"></div>
              <img src="assets/logo.png" alt="Logo Centre Auditif" class="login-logo" />
            </div>
            <h1 class="login-title">Cabinet Auditif</h1>
            <p class="login-subtitle">Système de Facturation Professionnel</p>
          </div>
          
          <div class="login-form">
            <div class="input-group">
              <label for="password" class="input-label">
                <span class="label-text">Mot de passe</span>
                <span class="label-required">*</span>
              </label>
              <div class="input-wrapper">
                <input
                  id="password"
                  type="password"
                  [(ngModel)]="password"
                  name="password"
                  required
                  autocomplete="current-password"
                  class="input-field"
                  [class.input-error]="error"
                  placeholder="Entrez votre mot de passe sécurisé"
                />
                <div class="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
              <div *ngIf="error" class="error-message">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <span>Mot de passe incorrect. Veuillez réessayer.</span>
              </div>
            </div>
            
            <button type="submit" class="login-button" [disabled]="!password">
              <div class="button-bg"></div>
              <span class="button-text">Se connecter</span>
              <svg class="button-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          
          <div class="login-footer">
            <div class="security-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Accès sécurisé</span>
            </div>
            <p class="footer-text">Version professionnelle 2025</p>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      overflow: hidden;
    }

    /* Advanced Animated Background */
    .background-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
    }

    .gradient-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, 
        #fdf2f8 0%, 
        #fce7f3 25%, 
        #f3e8ff 50%, 
        #fce7f3 75%, 
        #fdf2f8 100%);
      animation: gradientShift 20s ease-in-out infinite;
    }

    .floating-shapes {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
    }

    .shape {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(45deg, rgba(198, 16, 86, 0.1), rgba(198, 16, 86, 0.05));
      animation: float 20s ease-in-out infinite;
    }

    .shape-1 {
      width: 80px;
      height: 80px;
      top: 10%;
      left: 10%;
      animation-delay: 0s;
      animation-duration: 25s;
    }

    .shape-2 {
      width: 60px;
      height: 60px;
      top: 20%;
      right: 15%;
      animation-delay: -5s;
      animation-duration: 30s;
    }

    .shape-3 {
      width: 100px;
      height: 100px;
      bottom: 20%;
      left: 20%;
      animation-delay: -10s;
      animation-duration: 35s;
    }

    .shape-4 {
      width: 40px;
      height: 40px;
      top: 60%;
      right: 25%;
      animation-delay: -15s;
      animation-duration: 28s;
    }

    .shape-5 {
      width: 120px;
      height: 120px;
      bottom: 10%;
      right: 10%;
      animation-delay: -20s;
      animation-duration: 40s;
    }

    .shape-6 {
      width: 50px;
      height: 50px;
      top: 40%;
      left: 5%;
      animation-delay: -8s;
      animation-duration: 22s;
    }

    .wave-animation {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 300px;
      overflow: hidden;
    }

    .wave {
      width: 100%;
      height: 100%;
    }

    .wave-path {
      animation: wave 15s ease-in-out infinite;
      transform-origin: center bottom;
    }

    .wave-1 {
      fill: rgba(198, 16, 86, 0.03);
      animation-delay: 0s;
    }

    .wave-2 {
      fill: rgba(198, 16, 86, 0.02);
      animation-delay: -5s;
    }

    .wave-3 {
      fill: rgba(198, 16, 86, 0.01);
      animation-delay: -10s;
    }

    .login-content {
      width: 100%;
      max-width: 420px;
      padding: 1rem;
      animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 10;
      position: relative;
    }

    .login-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.8);
      border-radius: 24px;
      padding: 2.5rem;
      box-shadow: 
        0 32px 64px rgba(198, 16, 86, 0.15),
        0 16px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.6);
      position: relative;
      overflow: hidden;
    }

    .login-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #c61056, #a50e48, #c61056);
      background-size: 200% 100%;
      animation: shimmer 3s ease-in-out infinite;
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo-container {
      position: relative;
      display: inline-block;
      margin-bottom: 1.5rem;
    }

    .logo-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120px;
      height: 120px;
      background: radial-gradient(circle, rgba(198, 16, 86, 0.2) 0%, transparent 70%);
      border-radius: 50%;
      animation: pulse 3s ease-in-out infinite;
    }

    .login-logo {
      width: 80px;
      height: 80px;
      object-fit: contain;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      padding: 12px;
      position: relative;
      z-index: 2;
      filter: drop-shadow(0 8px 16px rgba(198, 16, 86, 0.2));
    }

    .login-title {
      color: #2c3e50;
      font-size: 1.875rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      letter-spacing: -0.025em;
      background: linear-gradient(135deg, #2c3e50, #c61056);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .login-subtitle {
      color: #64748b;
      font-size: 1rem;
      font-weight: 500;
      margin: 0;
      opacity: 0.8;
    }

    .login-form {
      margin-bottom: 2rem;
    }

    .input-group {
      margin-bottom: 1.5rem;
    }

    .input-label {
      display: block;
      margin-bottom: 0.75rem;
      color: #374151;
      font-weight: 600;
      font-size: 0.875rem;
      letter-spacing: 0.025em;
    }

    .label-required {
      color: #c61056;
      margin-left: 2px;
    }

    .input-wrapper {
      position: relative;
    }

    .input-field {
      width: 100%;
      padding: 1rem 3rem 1rem 1rem;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 1rem;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-sizing: border-box;
    }

    .input-field:focus {
      outline: none;
      border-color: #c61056;
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 
        0 0 0 3px rgba(198, 16, 86, 0.1),
        0 8px 16px rgba(198, 16, 86, 0.1);
      transform: translateY(-1px);
    }

    .input-field.input-error {
      border-color: #ef4444;
      background: rgba(254, 242, 242, 0.9);
    }

    .input-field.input-error:focus {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .input-icon {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
      transition: all 0.3s;
    }

    .input-field:focus + .input-icon {
      color: #c61056;
      transform: translateY(-50%) scale(1.1);
    }

    .input-field.input-error + .input-icon {
      color: #ef4444;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #ef4444;
      font-size: 0.875rem;
      font-weight: 500;
      margin-top: 0.75rem;
      padding: 0.75rem 1rem;
      background: rgba(254, 242, 242, 0.9);
      backdrop-filter: blur(10px);
      border: 1px solid #fecaca;
      border-radius: 8px;
      animation: slideDown 0.3s ease;
    }

    .login-button {
      width: 100%;
      padding: 1rem 1.5rem;
      background: linear-gradient(135deg, #c61056 0%, #a50e48 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      box-shadow: 
        0 8px 20px rgba(198, 16, 86, 0.3),
        0 4px 12px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .button-bg {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(255, 255, 255, 0.2), 
        transparent);
      transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .login-button:hover {
      background: linear-gradient(135deg, #a50e48 0%, #8b0d3e 100%);
      transform: translateY(-3px) scale(1.02);
      box-shadow: 
        0 12px 28px rgba(198, 16, 86, 0.4),
        0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .login-button:hover .button-bg {
      left: 100%;
    }

    .login-button:hover .button-arrow {
      transform: translateX(3px);
    }

    .login-button:active {
      transform: translateY(-1px) scale(1.01);
      transition: transform 0.1s;
    }

    .login-button:disabled {
      background: #e2e8f0;
      color: #9ca3af;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .button-arrow {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .login-footer {
      text-align: center;
      border-top: 1px solid rgba(198, 16, 86, 0.1);
      padding-top: 1.5rem;
    }

    .security-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(198, 16, 86, 0.05);
      color: #c61056;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      border: 1px solid rgba(198, 16, 86, 0.1);
    }

    .footer-text {
      color: #6b7280;
      font-size: 0.75rem;
      font-weight: 500;
      margin: 0;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    /* Advanced Animations */
    @keyframes gradientShift {
      0%, 100% {
        background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #f3e8ff 50%, #fce7f3 75%, #fdf2f8 100%);
      }
      50% {
        background: linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 25%, #fce7f3 50%, #f3e8ff 75%, #fce7f3 100%);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px) translateX(0px) rotate(0deg);
      }
      33% {
        transform: translateY(-30px) translateX(20px) rotate(120deg);
      }
      66% {
        transform: translateY(20px) translateX(-15px) rotate(240deg);
      }
    }

    @keyframes wave {
      0%, 100% {
        transform: translateX(0%) scaleY(1);
      }
      50% {
        transform: translateX(-25%) scaleY(1.1);
      }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 0.6;
        transform: translate(-50%, -50%) scale(1);
      }
      50% {
        opacity: 0.8;
        transform: translate(-50%, -50%) scale(1.05);
      }
    }

    @keyframes shimmer {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 480px) {
      .login-content {
        padding: 0.5rem;
      }
      
      .login-card {
        padding: 2rem 1.5rem;
        border-radius: 16px;
      }
      
      .login-title {
        font-size: 1.5rem;
      }
      
      .login-logo {
        width: 64px;
        height: 64px;
      }

      .floating-shapes .shape {
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
export class LoginComponent {
  password = '';
  error = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.error = false;
    this.auth.login(this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/app']);
      } else {
        this.error = true;
      }
    });
  }
}