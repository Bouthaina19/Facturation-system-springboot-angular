import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private apiUrl = 'http://localhost:8089/facturation_db/api/factures';

  constructor(private http: HttpClient) {}


  addFacture(facture: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, facture);
  }
  getFactures(page: number, size: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
}

  generatePdf(id: number) {
    return this.http.post(`${this.apiUrl}/${id}/pdf`, null, { responseType: 'blob' });
  }
  downloadPdf(id: number) {
    return this.http.get(`${this.apiUrl}/${id}/pdf`, { responseType: 'blob' });
  }
  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }



  
}
