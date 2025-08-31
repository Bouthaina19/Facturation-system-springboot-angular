import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FactureService } from '../../services/facture';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormsModule } from '@angular/forms';


export interface Facture {
  id: number;
  numeroFacture: string;
  dateFacture: string; // format ISO du backend
  nomClient: string;
  totalTTC: number;
}

@Component({
  selector: 'app-facture-liste',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './facture-list.html',
  styleUrls: ['./facture-list.css']
})
export class FactureListeComponent implements OnInit {

  
factures: Facture[] = [];
  filteredFactures: Facture[] = [];

  searchTerm: string = '';
  selectedYear: string = 'all';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  totalElements = 0;
  page = 0;
  size = 10;

  years: string[] = []; // Liste des années extraites des factures

  constructor(private factureService: FactureService) {}

  ngOnInit(): void {
    this.loadFactures();
  }

  loadFactures() {
  this.factureService.getFactures(this.page, this.size).subscribe({
    next: (data) => {
      this.factures = data.content;
      this.totalElements = data.totalElements;
      this.extractYears();
      this.applyFilters();
    },
    error: () => Swal.fire('Erreur', 'Impossible de charger les factures.', 'error')
  });
}


  extractYears() {
    const yearsSet = new Set<string>();
    this.factures.forEach(f => {
      const year = new Date(f.dateFacture).getFullYear().toString();
      yearsSet.add(year);
    });
    this.years = Array.from(yearsSet).sort().reverse();
  }

  applyFilters() {
    let filtered = this.factures;

    // 🔍 Filtrer par recherche (client ou numéro)
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(f =>
        f.nomClient.toLowerCase().includes(term) ||
        f.numeroFacture.toLowerCase().includes(term)
      );
    }

    // 📅 Filtrer par année
    if (this.selectedYear !== 'all') {
      filtered = filtered.filter(f =>
        new Date(f.dateFacture).getFullYear().toString() === this.selectedYear
      );
    }

    // ⬆⬇ Trier
    if (this.sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        let valueA: any = a[this.sortColumn as keyof Facture];
        let valueB: any = b[this.sortColumn as keyof Facture];

        if (this.sortColumn === 'dateFacture') {
          valueA = new Date(valueA).getTime();
          valueB = new Date(valueB).getTime();
        }

        if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.filteredFactures = filtered;
  }

  toggleSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  supprimerFacture(id: number) {
    Swal.fire({
      title: 'Supprimer cette facture ?',
      text: "Vous ne pourrez pas la récupérer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c61056',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.factureService.delete(id).subscribe({
          next: () => {
            this.loadFactures();
            Swal.fire('Supprimée!', 'La facture a été supprimée.', 'success');
          },
          error: () => Swal.fire('Erreur', 'Suppression impossible.', 'error')
        });
      }
    });
  }

  telechargerFacture(id: number) {
    const facture = this.factures.find(f => f.id === id);
    const numeroFacture = facture?.numeroFacture;
    const nomPdf = numeroFacture
      ? `facture-${numeroFacture}.pdf`
      : `facture-${id}.pdf`;

    this.factureService.downloadPdf(id).subscribe({
      next: (blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = nomPdf;
        a.click();
        URL.revokeObjectURL(a.href);
      },
      error: () => Swal.fire('Erreur', 'PDF introuvable, régénérez la facture.', 'error')
    });
  }

  get totalPages() {
  return Math.ceil(this.totalElements / this.size);
}

nextPage() {
  if (this.page + 1 < this.totalPages) {
    this.page++;
    this.loadFactures();
  }
}

prevPage() {
  if (this.page > 0) {
    this.page--;
    this.loadFactures();
  }
}



}
