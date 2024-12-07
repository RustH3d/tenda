
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-mis-ventas',
  standalone: true,
  templateUrl: './mis-ventas.component.html',
  styleUrls: ['./mis-ventas.component.css'],
  imports: [CommonModule, FormsModule]
})
export class MisVentasComponent implements OnInit {
  product = {
    name: '',
    description: '',
    price: 0,
    category: '', 
    imageUrl: ''
  };
  selectedFile: File | null = null;
  showForm = false;
  userProducts: any[] = [];

  constructor(private productService: ProductService, private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserProducts();
  }

  getUserProducts(): void {
    this.productService.getUserProducts().subscribe(
      data => {
        this.userProducts = data;
      },
      error => {
        console.error('Error al obtener productos del usuario:', error);
      }
    );
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.http.post<{ imageUrl: string }>('http://localhost:3000/upload', formData).subscribe(
        (response) => {
          this.product.imageUrl = response.imageUrl;
          this.productService.addProduct(this.product).subscribe(
            (data) => {
              console.log('Producto subido exitosamente:', data);
              this.getUserProducts();
              this.product = {
                name: '',
                description: '',
                price: 0,
                category: '',
                imageUrl: ''
              };
              this.selectedFile = null;
              this.showForm = false;
            },
            (error) => {
              console.error('Error al subir el producto:', error);
            }
          );
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
        }
      );
    }
  }

  editProduct(product: any): void {
    // Aquí puedes implementar la lógica para editar el producto
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        console.log('Producto eliminado exitosamente');
        this.getUserProducts();
      },
      error => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }
}
