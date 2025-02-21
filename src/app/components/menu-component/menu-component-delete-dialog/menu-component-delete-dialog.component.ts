import {Component, inject, TemplateRef} from '@angular/core';
import {TuiAlertService, TuiButton, TuiDialogContext, TuiNotification, TuiTitle} from '@taiga-ui/core';
import {MenuComponentService} from '../../../core/menu/menu-component.service';
import {MenuComponent} from '../../../models/menu.model';
import {TuiResponsiveDialogService} from '@taiga-ui/addon-mobile';
import {injectContext} from '@taiga-ui/polymorpheus';
@Component({
  selector: 'app-menu-component-delete-dialog',
  imports: [TuiButton, TuiNotification, TuiTitle],
  templateUrl: './menu-component-delete-dialog.component.html',
  styleUrl: './menu-component-delete-dialog.component.css',
  standalone: true,
})
export class MenuComponentDeleteDialogComponent {
  constructor(private menuComponentService: MenuComponentService) {
  }
  // El menú a eliminar, lo recibimos por el contexto del diálogo.
  menuComponent!: MenuComponent;
  private readonly dialogs = inject(TuiResponsiveDialogService);
  public readonly context = injectContext<TuiDialogContext<MenuComponent | null, MenuComponent | null>>();
  protected value: MenuComponent | null = null;
  private readonly alerts = inject(TuiAlertService);



  protected get hasValue(): boolean {
    return this.value !== null;
  }

  protected get data(): MenuComponent {
    return this.context.data;
  }

  protected submit(): void {
    if (this.value !== null) {
      this.context.completeWith(this.value);
    }
  }

  protected showDialog(content: TemplateRef<TuiDialogContext>): void {
    this.dialogs.open(content, { dismissible: true }).subscribe();
  }

  confirmDelete(): void {
    console.log('Eliminando menú...:', this.context.data.id, this.context.data.name);

    this.menuComponentService.deleteMenuComponent(this.context.data.id!).subscribe({
      next: () => {
        this.context.completeWith(this.menuComponent);
      },
      error: (error) => {
        console.error('Error al eliminar el menú:', error);
        this.showDeleteErrorAlert()
      }
    });
  }

  private showDeleteErrorAlert(): void {
    this.alerts
      .open('No se puede eliminar el componente porque está asociado a un menú existente.', {
        label: 'Error al eliminar',
        appearance: 'negative',  // Usa 'negative' para errores
        autoClose: 5000,         // Se cierra en 5 segundos
      })
      .subscribe();
  }






}
