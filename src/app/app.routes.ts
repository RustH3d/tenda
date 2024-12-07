import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarritoComponent } from './carrito/carrito.component';
import { MisVentasComponent } from './mis-ventas/mis-ventas.component';
import { GraciasComponent } from './gracias/gracias.component'; 

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'mi-carrito', component: CarritoComponent },
  { path: 'mis-ventas', component: MisVentasComponent },
  { path: 'gracias', component: GraciasComponent }, 
];
