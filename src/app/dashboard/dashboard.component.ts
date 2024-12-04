import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  searchTerm: string = '';
  categorias: string[] = ['Electrónica', 'Moda', 'Hogar', 'Juguetes', 'Deportes'];

  buscarProductos() {
    console.log('Buscando productos:', this.searchTerm);
    // Aquí iría la lógica para buscar productos por el término de búsqueda
  }

  buscarPorCategoria(categoria: string) {
    console.log('Buscando productos en la categoría:', categoria);
    // Aquí iría la lógica para buscar productos por categoría
  }
}
