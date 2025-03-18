import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';  // Servicio de autenticación

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    
  ]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';  // Propiedad para mostrar el mensaje de error

  constructor(private authService: AuthService, private router: Router) {}

  // Método de login
  login() {
    this.errorMessage = '';  // Resetea el mensaje de error al intentar loguear
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        this.router.navigate(['/module']);  // Redirige al módulo principal
      },
      error: (error) => {
        console.error('Error en el login:', error);
        this.errorMessage = 'Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.';  // Muestra el mensaje de error
      }
    });
  }

  // Método para redirigir al registro
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
