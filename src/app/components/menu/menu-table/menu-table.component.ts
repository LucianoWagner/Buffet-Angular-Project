import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input,
  OnChanges, Output,
  SimpleChanges,
} from '@angular/core';
import { Menu } from '../../../models/menu.model';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import { MenuComponent } from '../menu.component';
import {TuiButton, tuiDialog, TuiDropdownDirective} from '@taiga-ui/core';
import {ActionsDropdownComponent} from './actions-dropdown/actions-dropdown.component';
import {MenuEditDialogComponent} from './menu-edit-dialog/menu-edit-dialog.component';
import {findComponent} from '../../../utils/utils';
import {MenuDeleteDialogComponent} from './menu-delete-dialog/menu-delete-dialog.component';

@Component({
  selector: 'app-menu-table',
  imports: [NgForOf, CurrencyPipe, NgIf, TuiButton, TuiDropdownDirective, ActionsDropdownComponent],
  templateUrl: './menu-table.component.html',
  styleUrl: './menu-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class MenuTableComponent {
  @Input() menus: Menu[] = [];
  @Input() columns: { id: string; label: string }[] = [];
  @Output() refreshMenus = new EventEmitter<void>();

  activeDropdownId: number | null = null;

  private readonly editDialog = tuiDialog(MenuEditDialogComponent, {
    dismissible: true,


    closeable: true,

  });
  private readonly deleteDialog = tuiDialog(MenuDeleteDialogComponent, {
    dismissible: true,
    label: 'Eliminar Menu',
  });


  protected toggleEditDialog(menu: Menu) {
    console.log("ID DEL MENU" + menu.id);
    this.editDialog(menu).subscribe({
      next: (result) => {

        this.refreshMenus.emit();
      },
      complete: () => {

        console.log('Dialog closed');
      }

    })
  }

  protected toggleDeleteDialog (menu: Menu){
    this.deleteDialog(menu).subscribe({
      next: (result) => {
        console.log(result);
      },
      complete: () => {
        console.log('dialog closed');
      }
    })
  }





  protected readonly MenuComponent = MenuComponent;
  protected readonly findComponent = findComponent;
}
