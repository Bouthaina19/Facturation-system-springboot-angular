import { Produit } from './produit';

export interface LigneFacture {
  produit: Produit;
  quantite: number;
  tva: number;
  prixUnitaire: number;
  prixTotalHT: number;
  prixTotalTTC: number;
}
