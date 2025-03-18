import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // Base URL del backend
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // **Método de Login**
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { 
      headers: this.headers, 
      withCredentials: true 
    });
  }

  // **Método de Registro**
  register(email: string, password: string, nombre: string, apellido: string, telefono: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/register`,
      { email, password, nombre, apellido, telefono },
      { headers: this.headers, withCredentials: true } // Ahora incluye `withCredentials`
    );
  }

  // **Método de Logout corregido**
  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  // **Verificar si el usuario está autenticado**
  isLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/isLoggedIn`, { withCredentials: true });
  }
}
