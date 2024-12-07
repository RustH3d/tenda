import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [FormsModule, CommonModule]
})
export class DashboardComponent implements OnInit {
  searchTerm: string = '';
  productos: any[] = [];
  filteredProducts: any[] = [];
  carrito: any[] = [];
  private searchTerms = new Subject<string>();

  constructor(private productService: ProductService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.obtenerProductosAleatorios();
      this.configurarBusqueda();
    } else {
      this.router.navigate(['/login']);
    }
  }

  configurarBusqueda(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.productService.getProducts(term))
    ).subscribe(data => {
      this.filteredProducts = data;
    }, error => {
      console.error('Error al buscar productos:', error);
    });
  }

  irAMisVentas(): void {
    this.router.navigate(['/mis-ventas']);
  }

  irAMiCarrito(): void {
    this.router.navigate(['/mi-carrito']);
  }

  buscarProductos(): void {
    if (this.searchTerm === '') {
      this.filteredProducts = [];
    } else {
      this.searchTerms.next(this.searchTerm);
    }
  }

  obtenerProductosAleatorios(): void {
    this.productService.getRandomProducts().subscribe(data => {
      this.productos = data;
    }, error => {
      console.error('Error al obtener productos aleatorios:', error);
    });
  }

  anadirAlCarrito(producto: any): void {
    if (!this.authService.isLoggedIn()) {
      return;
    }

    this.carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    console.log('Producto añadido al carrito:', producto);
    alert('Producto añadido al carrito exitosamente!'); 
  }
}
