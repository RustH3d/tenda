import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent {
  selectedModule: string = ''; 

  constructor(private router: Router) {}

  onModuleSelect(event: any): void {
    this.selectedModule = event.target.value; 

    if (this.selectedModule === 'seguridad') {
      this.router.navigate(['/security']); 
    } else if (this.selectedModule === 'biblioteca') {
      this.router.navigate(['/biblioteca']); 
    }
  }
}
