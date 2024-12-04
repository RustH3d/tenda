import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';  

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AppRoutingModule } from './app-routing.module';  

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, RouterModule),  
    [AppRoutingModule]
  ]
}).catch(err => console.error(err));
