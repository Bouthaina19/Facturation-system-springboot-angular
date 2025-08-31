import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProduitService } from '../../services/produit';
import Swal from 'sweetalert2';
import { Produit } from '../../models/produit';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './produits.html',
  styleUrls: ['./produits.css']
})
export class Produits implements OnInit {

  produits: Produit[] = [];
  filteredProduits: Produit[] = []; // ✅ pour afficher la liste filtrée
  produitForm: Produit = { nom: '', prixHT: 0, tva: 19 };
  isEditing = false;
  editId: number | null = null;
  errorMsg = '';

  // ✅ variables recherche et tri
  searchTerm: string = '';
  sortKey: string = 'nom';
  sortDirection: 'asc' | 'desc' = 'asc';
  totalElements = 0;
  page = 0;
  size = 10;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits() {
  this.produitService.getProduits(this.page, this.size).subscribe({
    next: (data) => {
      this.produits = data.content;
      this.totalElements = data.totalElements;
      this.applyFilters();
    },
    error: () => {
      Swal.fire('Erreur', 'Impossible de charger les produits.', 'error');
    }
  });
}


  // ✅ Recherche + Tri
  applyFilters() {
    // Recherche
    let filtered = this.produits.filter(p =>
      p.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Tri
    filtered.sort((a, b) => {
      let valA = (this.sortKey === 'prixHT') ? a.prixHT : a.nom.toLowerCase();
      let valB = (this.sortKey === 'prixHT') ? b.prixHT : b.nom.toLowerCase();

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredProduits = filtered;
  }

  changeSort(key: string) {
    if (this.sortKey === key) {
      // Inverse si on clique deux fois
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  saveProduit() {
    if (!this.produitForm.nom || this.produitForm.prixHT <= 0) {
      this.errorMsg = 'Nom et prix valides requis.';
      return;
    }
    if (![0, 19].includes(this.produitForm.tva)) {
      this.errorMsg = 'TVA doit être 0 ou 19.';
      return;
    }

    if (this.isEditing && this.editId !== null) {
      Swal.fire({
        title: 'Confirmer la modification ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Oui, modifier',
        cancelButtonText: 'Annuler',
        confirmButtonColor: '#c61056'
      }).then(result => {
        if (result.isConfirmed) {
          this.produitService.updateProduit(this.editId!, this.produitForm).subscribe(() => {
            this.resetForm();
            this.loadProduits();
            Swal.fire('Modifié !', 'Le produit a été mis à jour.', 'success');
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Ajouter ce produit ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Oui, ajouter',
        cancelButtonText: 'Annuler',
        confirmButtonColor: '#c61056'
      }).then(result => {
        if (result.isConfirmed) {
          this.produitService.addProduit(this.produitForm).subscribe(() => {
            this.resetForm();
            this.loadProduits();
            Swal.fire('Ajouté !', 'Le produit a été ajouté.', 'success');
          });
        }
      });
    }
  }

  editProduit(p: Produit) {
    this.produitForm = { ...p };
    this.isEditing = true;
    this.editId = p.id!;
  }

  deleteProduit(id: number) {
    Swal.fire({
      title: 'Supprimer ce produit ?',
      text: "Cette action est irréversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c61056',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.produitService.deleteProduit(id).subscribe(() => {
          this.loadProduits();
          Swal.fire('Supprimé !', 'Le produit a été supprimé.', 'success');
        });
      }
    });
  }

  resetForm() {
    this.produitForm = { nom: '', prixHT: 0, tva: 19 };
    this.isEditing = false;
    this.editId = null;
    this.errorMsg = '';
  }


  get totalPages() {
  return Math.ceil(this.totalElements / this.size);
}

nextPage() {
  if (this.page + 1 < this.totalPages) {
    this.page++;
    this.loadProduits();
  }
}

prevPage() {
  if (this.page > 0) {
    this.page--;
    this.loadProduits();
  }
}

}


