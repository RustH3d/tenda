import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-category-products',
  standalone: true,
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css'],
  imports: [CommonModule]
})
export class CategoryProductsComponent implements OnInit {
  category: string = '';
  productos: any[] = [];
  carrito: any[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService, private authService: AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || '';
      this.getProductsByCategory();
    });
  }

  getProductsByCategory(): void {
    this.productService.getProductsByCategory(this.category).subscribe(data => {
      this.productos = data;
    }, error => {
      console.error('Error al obtener productos por categoría:', error);
    });
  }

  anadirAlCarrito(producto: any): void {
    if (!this.authService.isLoggedIn()) {
      return;
    }

    this.carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    console.log('Producto añadido al carrito:', producto);
  }
}
