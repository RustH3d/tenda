/* import { AuthService } from '../auth.service';  // Importar el servicio de autenticación
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
  email: string = '';  // Campo de correo electrónico
  password: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    // Verifica si el correo o la contraseña contienen solo espacios
    if (this.email.trim() === '' || this.password.trim() === '') {
      this.message = 'El correo y la contraseña no pueden contener solo espacios';
      this.isError = true;
      return;
    }

    this.authService.register(this.email, this.password).subscribe({
      next: (response: any) => {
        this.message = response?.message || 'Registro exitoso';
        this.isError = false;
        // Redirige al login después de un registro exitoso
        setTimeout(() => this.router.navigate(['/login']), 2000);
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
} */

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
  firstName: string = ''; // Nuevo campo: Nombre
  lastName: string = '';  // Nuevo campo: Apellido
  phone: string = '';     // Nuevo campo: Teléfono
  email: string = '';  
  password: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    // Verifica si algún campo está vacío o contiene solo espacios
    if (
      this.firstName.trim() === '' || 
      this.lastName.trim() === '' || 
      this.phone.trim() === '' || 
      this.email.trim() === '' || 
      this.password.trim() === ''
    ) {
      this.message = 'Todos los campos son obligatorios y no pueden contener solo espacios';
      this.isError = true;
      return;
    }

    // Enviar los datos al servicio de autenticación
    this.authService.register(this.firstName, this.lastName, this.phone, this.email, this.password).subscribe({
      next: (response: any) => {
        this.message = response?.message || 'Registro exitoso';
        this.isError = false;
        // Redirige al login después de un registro exitoso
        setTimeout(() => this.router.navigate(['/login']), 2000);
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