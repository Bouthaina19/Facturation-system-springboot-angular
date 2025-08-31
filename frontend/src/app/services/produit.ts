import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  
  private apiUrl = 'http://localhost:8089/facturation_db/api/produits';

  constructor(private http: HttpClient) {}

  getProduits(page: number = 0, size: number = 10): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
}


  addProduit(produit: any) {
  return this.http.post(`${this.apiUrl}`, produit);
}

updateProduit(id: number, produit: any) {
  return this.http.put(`${this.apiUrl}/${id}`, produit);
}

deleteProduit(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}


}
