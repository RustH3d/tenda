import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000'; // URL del backend

  constructor(private http: HttpClient) {}

  

  getProducts(searchTerm: string = ''): Observable<Product[]> {
    const url = `${this.apiUrl}/products?search=${searchTerm}`;
    return this.http.get<Product[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  getAllProducts(): Observable<Product[]> {
    const url = `${this.apiUrl}/products`;
    return this.http.get<Product[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  getUserProducts(): Observable<Product[]> {
    const url = `${this.apiUrl}/user/products`;
    return this.http.get<Product[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  getRandomProducts(): Observable<Product[]> {
    const url = `${this.apiUrl}/products/random`;
    return this.http.get<Product[]>(url).pipe(
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

  deleteProduct(productId: number): Observable<void> {
    const url = `${this.apiUrl}/products/${productId}`;
    return this.http.delete<void>(url).pipe(
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
