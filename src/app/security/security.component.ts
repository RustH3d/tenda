import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface BusinessObject {
  name: string;
  selected: boolean;
}

interface ModuleObjects {
  [key: string]: BusinessObject[];
}

interface Method {
  name: string;
  selected: boolean;
}

interface ObjectMethods {
  [key: string]: Method[];
}

@Component({
  selector: 'app-security',
  standalone: true,
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
  imports: [CommonModule, FormsModule]
})
export class SecurityComponent {
  constructor(private http: HttpClient) {}

  // Lista de módulos
  modules: string[] = ['Seguridad', 'Biblioteca'];
  selectedModule: string | null = null;

  // Perfiles disponibles
  profiles = [
    { name: 'Estudiante', selected: false },
    { name: 'Jurado', selected: false },
    { name: 'Bibliotecario', selected: false }
  ];
  selectedProfile: { name: string, selected: boolean } | null = null;

  // Objetos de negocios disponibles para cada módulo
  businessObjects: ModuleObjects = {
    'Seguridad': [],
    'Biblioteca': [
      { name: 'Usuarios', selected: false },
      { name: 'Libros', selected: false },
      { name: 'Artículos Científicos', selected: false }
    ]
  };
  selectedObject: BusinessObject | null = null;

  // Métodos disponibles para cada objeto de negocios
  methods: ObjectMethods = {
    'Usuarios': [
      { name: 'Crear Usuario', selected: false },
      { name: 'Eliminar Usuario', selected: false },
      { name: 'Modificar Usuario', selected: false },
      { name: 'Consultar Usuario', selected: false },
      { name: 'Asignar Roles', selected: false }
    ],
    'Libros': [
      { name: 'Registrar Libro', selected: false },
      { name: 'Eliminar Libro', selected: false },
      { name: 'Modificar Libro', selected: false },
      { name: 'Consultar Libro', selected: false },
      { name: 'Prestar Libro', selected: false }
    ],
    'Artículos Científicos': [
      { name: 'Publicar Artículo', selected: false },
      { name: 'Eliminar Artículo', selected: false },
      { name: 'Modificar Artículo', selected: false },
      { name: 'Consultar Artículo', selected: false },
      { name: 'Revisar Artículo', selected: false }
    ]
  };

  // Función cuando se selecciona un perfil
  onProfileChange() {
    this.selectedObject = null;
    this.selectedModule = null;
  }

  // Función cuando se selecciona un módulo
  onModuleChange() {
    this.selectedObject = null;
  }

  // Función cuando se selecciona un objeto de negocios
  onObjectChange() {}

  // Función para guardar los permisos
  savePermissions() {
    const selectedMethods = this.methods[this.selectedObject!.name].filter(method => method.selected);

    const data = {
      profile: this.selectedProfile,
      object: this.selectedObject,
      module: this.selectedModule,
      methods: selectedMethods
    };

    this.http.post('/api/savePermissions', data)
      .subscribe({
        next: () => {
          console.log('Permisos guardados');
          alert('Permisos guardados exitosamente');
        },
        error: (error) => {
          console.error('Error guardando permisos:', error);
          alert('Hubo un error al guardar los permisos.');
        }
      });
  }
}