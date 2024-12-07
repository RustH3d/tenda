import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { CarritoComponent } from './app/carrito/carrito.component';
import { MisVentasComponent } from './app/mis-ventas/mis-ventas.component'; 
import { GraciasComponent } from './app/gracias/gracias.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'mi-carrito', component: CarritoComponent },
  { path: 'mis-ventas', component: MisVentasComponent },
  { path: 'gracias', component: GraciasComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
