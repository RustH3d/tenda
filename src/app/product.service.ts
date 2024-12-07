import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:3000'; // URL del backend

  constructor(private http: HttpClient) {}

  getProducts(searchTerm: string = ''): Observable<Product[]> {
    const url = `${this.apiUrl}/products?search=${searchTerm}`;
    return this.http.get<Product[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
      catchError(this.handleError)
    );
  }

  getRandomProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/random`).pipe(
      catchError(this.handleError)
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const url = `${this.apiUrl}/products?category=${category}`;
    return this.http.get<Product[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  addProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Product>(`${this.apiUrl}/products`, product, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}

// Define la interfaz para Product
interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}
