import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // Para redirección
import { AuthService } from '../auth.service';  // Importar el servicio de autenticación

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Método de login
  login() {
    this.authService.login(this.username, this.password).subscribe(response => {
      // Si la autenticación es exitosa, redirigir al usuario
      console.log('Login exitoso', response);
      localStorage.setItem('token', response.token);  // Guardar el token si es necesario
      this.router.navigate(['/dashboard']);  // Redirige a la página principal de usuario
    }, error => {
      console.error('Error en el login:', error);
    });
  }

  // Método para redirigir al registro
  goToRegister() {
    this.router.navigate(['/register']);  // Redirige al formulario de registro
  }
}
