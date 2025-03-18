import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ModuleComponent } from './module/module.component';
import { SecurityComponent } from './security/security.component'; // Importación del componente Security
import { BibliotecaComponent } from './biblioteca/biblioteca.component'; // Importación del componente Biblioteca

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'module', component: ModuleComponent },
  { path: 'security', component: SecurityComponent }, // Ruta para Security
  { path: 'biblioteca', component: BibliotecaComponent }, // Ruta para Biblioteca
];

