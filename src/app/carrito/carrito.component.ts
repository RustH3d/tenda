import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  imports: [CommonModule]
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }
  }

  irAComprar(): void {
    console.log('Procediendo a la compra con los productos:', this.carrito);
    this.router.navigate(['/gracias']);
  }

  eliminarDelCarrito(index: number): void {
    this.carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    console.log('Producto eliminado del carrito');
  }
}
