import {Component, inject, type TemplateRef} from '@angular/core';
import {TuiButton, TuiDialogContext, TuiDialogService, TuiNotification, TuiTitle} from '@taiga-ui/core';
import {Menu} from '../../../../models/menu.model';
import {MenuService} from '../../../../core/menu/menu.service';
import { injectContext } from '@taiga-ui/polymorpheus';
import {TUI_CONFIRM} from '@taiga-ui/kit';
import type {TuiConfirmData} from '@taiga-ui/kit';
import {switchMap} from 'rxjs';
import {TuiResponsiveDialogService} from '@taiga-ui/addon-mobile';
import {TuiAlertService} from '@taiga-ui/core';


@Component({
  selector: 'app-menu-delete-dialog',
  imports: [TuiButton, TuiNotification, TuiTitle],
  templateUrl: './menu-delete-dialog.component.html',
  styleUrls: ['./menu-delete-dialog.component.css'],
  standalone: true,
})
export class MenuDeleteDialogComponent {
  constructor(private menuService: MenuService) {
  }
  // El menú a eliminar, lo recibimos por el contexto del diálogo.
  menu!: Menu;
  private readonly dialogs = inject(TuiResponsiveDialogService);
  public readonly context = injectContext<TuiDialogContext<Menu, Menu>>();
  protected value: Menu | null = null;
  private readonly alerts = inject(TuiAlertService);

  protected onClick(): void {
    const data: TuiConfirmData = {
      content:
        'This is <code>PolymorpheusContent</code> so it can be template too!',
      yes: 'That is great!',
      no: 'Who cares?',
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Do you like Taiga UI?',
        size: 's',
        data,
      })
      .pipe(switchMap((response) => this.alerts.open(String(response))))
      .subscribe();
  }

  protected get hasValue(): boolean {
    return this.value !== null;
  }

  protected get data(): Menu {
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
    this.menuService.deleteMenu(this.context.data.id!).subscribe({
      next: () => {
        this.context.completeWith(this.menu);  // Cierra el diálogo y pasa el menú eliminado
      },
      error: (error) => {
        console.error('Error al eliminar el menú:', error);
      }
    });
  }





}
