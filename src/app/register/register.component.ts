import { AuthService } from '../auth.service';  // Importar el servicio de autenticación
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';  // Campo de correo electrónico
  message: string = '';
  isError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    // Verifica si el nombre de usuario, la contraseña o el correo contienen solo espacios
    if (this.username.trim() === '' || this.password.trim() === '' || this.email.trim() === '') {
      this.message = 'El nombre de usuario, la contraseña y el correo no pueden contener solo espacios';
      this.isError = true;
      return;
    }

    this.authService.register(this.username, this.password, this.email).subscribe({
      next: (response: any) => {
        this.message = response?.message || 'Registro exitoso';
        this.isError = false;
        // Redirige al login después de un registro exitoso
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Error al registrar:', error);
        this.message = error.error?.error || 'Error en el registro';
        this.isError = true;
      }
    });
  }

  // Método para redirigir al login
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
