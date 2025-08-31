import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit';
import { Produit } from '../../models/produit';
import { LigneFacture } from '../../models/ligne-facture';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPlus, faFilePdf, faSave } from '@fortawesome/free-solid-svg-icons';
import { FactureService } from '../../services/facture';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facture-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FontAwesomeModule],
  templateUrl: './facture-form.html',
  styleUrls: ['./facture-form.css']
})
export class FactureForm implements OnInit {

  produits: Produit[] = [];
  lignes: LigneFacture[] = [];
  nomClient: string = '';
  totalHT: number = 0;
  totalTVA: number = 0;
  timbreFiscal: number = 0.6;
  totalTTC: number = 0;
  montantEnLettres: string = '';
  dateFacture: Date = new Date();
  numeroFacture: string = '';

  constructor(
    private produitService: ProduitService,
    private factureService: FactureService,
    library: FaIconLibrary
  ) {
    library.addIcons(faTrash, faPlus, faFilePdf, faSave);
  }

  ngOnInit(): void {
    this.produitService.getProduits(0, 50).subscribe({
  next: (data) => {
    this.produits = data.content; // ⚠️ car c’est un Page<> donc data.content
  },
  error: () => Swal.fire('Erreur', 'Impossible de charger les produits.', 'error')
});

  }

  ajouterLigne() {
    if (!this.produits?.length) {
    Swal.fire('Erreur', 'Aucun produit disponible pour créer une ligne', 'error');
    return;
  }

  // Par défaut, on met quantité = 1, mais si jamais l’utilisateur modifie à 0 → alerte
  const produit = this.produits[0];
  if (!produit) return;
  const quantite = 1;

  if (quantite <= 0) {
    Swal.fire('Quantité invalide', 'La quantité doit être supérieure à 0.', 'warning');
    return;
  }
    

    this.lignes.push({
      produit: produit,
      quantite: quantite,
      tva: 19,
      prixUnitaire: produit.prixHT,
      prixTotalHT: produit.prixHT * quantite,
      prixTotalTTC: produit.prixHT * quantite * 1.19
    });

    this.calculerTotaux();
  
}


  supprimerLigne(index: number) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Supprimer cette ligne ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.lignes.splice(index, 1);
        this.calculerTotaux();
        Swal.fire('Supprimée!', 'La ligne a été supprimée.', 'success');
      }
    });
  }

  mettreAJourLigne(index: number) {
    let ligne = this.lignes[index];
     if (!ligne?.produit) return;
    if (ligne.quantite <= 0) {
    Swal.fire('Quantité invalide', 'La quantité doit être supérieure à 0.', 'warning');
    ligne.quantite = 1; // reset par défaut
  }
    ligne.prixUnitaire = ligne.produit.prixHT;
    ligne.prixTotalHT = ligne.quantite * ligne.prixUnitaire;
    ligne.prixTotalTTC = ligne.prixTotalHT * (1 + ligne.tva / 100);
    this.calculerTotaux();
  }

  calculerTotaux() {
    this.totalHT = this.lignes.reduce((sum, l) => sum + l.prixTotalHT, 0);
    this.totalTVA = this.lignes.reduce((sum, l) => sum + (l.prixTotalTTC - l.prixTotalHT), 0);
    this.totalTTC = this.totalHT + this.totalTVA + this.timbreFiscal;

    this.montantEnLettres = montantTNDEnLettres(this.totalTTC);
  }

  enregistrerEtImprimer() {
    if (!this.nomClient || this.lignes.length === 0) {
      Swal.fire('Erreur', 'Veuillez entrer un client et au moins une ligne de facture.', 'error');
      return;
    }

    const facture = {
      nomClient: this.nomClient,
      dateFacture: this.dateFacture,
      totalHT: this.totalHT,
      totalTVA: this.totalTVA,
      timbreFiscal: this.timbreFiscal,
      totalTTC: this.totalTTC,
      lignes: this.lignes
    };

    this.factureService.addFacture(facture).subscribe({
      next: (savedFacture) => {
        this.numeroFacture = savedFacture.numeroFacture;

        // Générer + archiver + télécharger depuis le serveur
      this.factureService.generatePdf(savedFacture.id).subscribe({
        next: (blob) => {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `facture-${savedFacture.numeroFacture}.pdf`;
          a.click();
          URL.revokeObjectURL(a.href);

          Swal.fire('Succès', 'Facture enregistrée et PDF archivé.', 'success');
        },
        error: () => Swal.fire('Erreur', 'Échec génération PDF serveur.', 'error')
      });
    },
    error: () => Swal.fire('Erreur', 'Échec enregistrement facture.', 'error')
  });
}
}

/* -------------------------------------------------------
   Fonctions utilitaires : nombres -> lettres en français
   ------------------------------------------------------- */
function nombreEnLettres(n: number): string {
  if (!Number.isFinite(n)) return '';

  const moins = n < 0 ? 'moins ' : '';
  n = Math.abs(Math.trunc(n));

  if (n === 0) return 'zéro';

  const units = [
    '', 'un', 'deux', 'trois', 'quatre', 'cinq',
    'six', 'sept', 'huit', 'neuf', 'dix', 'onze',
    'douze', 'treize', 'quatorze', 'quinze', 'seize'
  ];

  function deuxChiffres(x: number): string {
    if (x < 17) return units[x];
    if (x < 20) return 'dix-' + units[x - 10];
    if (x < 70) {
      const d = Math.floor(x / 10);
      const u = x % 10;
      const tensMap = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante'];
      const base = tensMap[d];
      if (u === 0) return base;
      if (u === 1 && d !== 8) return base + ' et un';
      return base + '-' + units[u];
    }
    if (x < 80) {
      const rest = x - 60;
      if (rest === 11) return 'soixante et onze';
      return 'soixante-' + deuxChiffres(rest);
    }
    const rest = x - 80;
    const base80 = 'quatre-vingt' + (rest === 0 ? 's' : '');
    if (rest === 0) return base80;
    if (rest === 1) return 'quatre-vingt-un';
    return base80 + '-' + deuxChiffres(rest);
  }

  function troisChiffres(x: number): string {
    if (x < 100) return deuxChiffres(x);
    const c = Math.floor(x / 100);
    const r = x % 100;
    if (c === 1) return r === 0 ? 'cent' : 'cent ' + deuxChiffres(r);
    const cent = 'cent' + (r === 0 ? 's' : '');
    return units[c] + ' ' + cent + (r === 0 ? '' : ' ' + deuxChiffres(r));
  }

  let parts: string[] = [];
  const milliards = Math.floor(n / 1_000_000_000);
  const millions = Math.floor((n % 1_000_000_000) / 1_000_000);
  const milliers = Math.floor((n % 1_000_000) / 1000);
  const reste = n % 1000;

  if (milliards) parts.push((milliards === 1 ? 'un' : troisChiffres(milliards)) + ' milliard' + (milliards > 1 ? 's' : ''));
  if (millions) parts.push((millions === 1 ? 'un' : troisChiffres(millions)) + ' million' + (millions > 1 ? 's' : ''));
  if (milliers) parts.push((milliers === 1 ? '' : troisChiffres(milliers) + ' ') + 'mille');
  if (reste) parts.push(troisChiffres(reste));

  return moins + parts.join(' ').replace(/\s+/g, ' ').trim();
}

function montantTNDEnLettres(montant: number): string {
  if (!Number.isFinite(montant)) return '';
  const entier = Math.floor(Math.abs(montant));
  const millimes = Math.round((Math.abs(montant) - entier) * 1000);

  const partDinars = nombreEnLettres(entier);
  const libDinar = entier === 1 ? 'dinar' : 'dinars';

  if (millimes === 0) {
    return capitalize(partDinars) + ' ' + libDinar;
  }

  const partMillimes = nombreEnLettres(millimes);
  const libMillime = millimes === 1 ? 'millime' : 'millimes';

  return `${capitalize(partDinars)} ${libDinar} et ${partMillimes} ${libMillime}`;
}

function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

