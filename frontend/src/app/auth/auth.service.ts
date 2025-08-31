import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private KEY = 'authToken';

  constructor(private http: HttpClient) {}

  login(password: string): Observable<boolean> {
    return this.http.post<{ token: string }>('http://localhost:8089/facturation_db/auth/login', { password }).pipe(
      tap(response => {
        localStorage.setItem(this.KEY, response.token); // ✅ stocker dans localStorage
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  logout() { localStorage.removeItem(this.KEY); }


  isLoggedIn() {
  const token = localStorage.getItem(this.KEY);
  console.log("AuthService.isLoggedIn →", token);
  return !!token;
}

  getToken() { return localStorage.getItem(this.KEY); }

}