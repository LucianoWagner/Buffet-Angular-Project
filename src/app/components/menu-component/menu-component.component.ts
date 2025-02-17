import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuComponentService } from '../../core/menu/menu-component.service';
import { TuiDialogService, TuiNotification, TuiAlertService } from '@taiga-ui/core';
import { Observable } from 'rxjs';
import {initFlowbite} from 'flowbite';

interface MenuComponent {
  id: number;
  name: string;
  imageUrl?: string;
  type: string;
}

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  standalone: true,
  styleUrls: ['./menu-component.component.scss']
})
export class MenuComponentComponent implements OnInit {
  menuComponents: MenuComponent[] = [];
  form: FormGroup;
  isModalOpen = false;
  isEditing = false;
  selectedComponent: MenuComponent | null = null;
  menuComponentTypes = ['Entrada', 'Plato Principal', 'Postre', 'Bebida'];
  activeDropdownId: number | null = null;

  constructor(
    private menuComponentService: MenuComponentService,
    private fb: FormBuilder,
    private alertService: TuiAlertService,
    private dialogService: TuiDialogService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      imageUrl: [''],
      type: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMenuComponents();

  }



  // Cargar la lista de componentes del menú
  loadMenuComponents(): void {
    this.menuComponentService.getAllMenuComponents().subscribe({
      next: (components) => this.menuComponents = components,
      error: () => this.showNotification('Error al cargar los componentes', 'error')
    });
  }

  // Abrir modal para agregar un nuevo componente
  openAddModal(): void {
    this.isEditing = false;
    this.selectedComponent = null;
    this.form.reset();
    this.isModalOpen = true;
  }

  // Abrir modal para editar un componente existente
  openEditModal(component: MenuComponent): void {
    this.isEditing = true;
    this.selectedComponent = component;
    this.form.patchValue(component);
    this.isModalOpen = true;
  }

  // Cerrar modal
  closeModal(): void {
    this.isModalOpen = false;
    this.form.reset();
  }

  // Enviar formulario para agregar o editar
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;

    if (this.isEditing && this.selectedComponent) {
      this.updateComponent(this.selectedComponent.id, formData);
    } else {
      this.createComponent(formData);
    }
  }

  // Crear un nuevo componente de menú
  createComponent(data: MenuComponent): void {
    this.menuComponentService.addMenuComponent(data).subscribe({
      next: (newComponent) => {
        this.menuComponents.push(newComponent);
        this.showNotification('Componente agregado exitosamente', 'success');
        this.closeModal();
      },
      error: () => this.showNotification('Error al agregar el componente', 'error')
    });
  }

  // Actualizar un componente existente
  updateComponent(id: number, data: MenuComponent): void {
    this.menuComponentService.updateMenuComponent(id, data).subscribe({
      next: (updatedComponent) => {
        const index = this.menuComponents.findIndex(c => c.id === id);
        if (index !== -1) {
          this.menuComponents[index] = <MenuComponent>updatedComponent;
        }
        this.showNotification('Componente actualizado exitosamente', 'success');
        this.closeModal();
      },
      error: () => this.showNotification('Error al actualizar el componente', 'error')
    });
  }

// Eliminar un componente con confirmación
  deleteComponent(id: number): void {
    this.dialogService.open('¿Seguro que quieres eliminar este componente?', { label: 'Confirmar Eliminación' }).subscribe({
      next: (confirmed: boolean | void) => { // Aseguramos que confirmed sea boolean o void
        if (confirmed) {
          this.menuComponentService.deleteMenuComponent(id).subscribe({
            next: () => {
              this.menuComponents = this.menuComponents.filter(c => c.id !== id);
              this.showNotification('Componente eliminado exitosamente', 'success');
            },
            error: () => this.showNotification('Error al eliminar el componente', 'error')
          });
        }
      }
    });
  }

  // Mostrar notificaciones
  private showNotification(message: string, type: 'success' | 'error'): void {
    this.alertService.open(message).subscribe();
  }
}
