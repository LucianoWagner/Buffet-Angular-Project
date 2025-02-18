import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Menu } from '../../../models/menu.model';
import { CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { MenuComponent } from '../menu.component';
import {
  TuiAppearance,
  TuiButton,
  tuiDialog,
  TuiDropdownDirective,
  TuiIcon,
} from '@taiga-ui/core';
import { ActionsDropdownComponent } from './actions-dropdown/actions-dropdown.component';
import { MenuEditDialogComponent } from './menu-edit-dialog/menu-edit-dialog.component';
import { findComponent } from '../../../utils/utils';
import { MenuDeleteDialogComponent } from './menu-delete-dialog/menu-delete-dialog.component';
import { MenuAddDialogComponent } from './menu-add-dialog/menu-add-dialog.component';

@Component({
  selector: 'app-menu-table',
  imports: [
    NgForOf,
    CurrencyPipe,
    NgIf,
    TuiButton,
    TuiDropdownDirective,
    ActionsDropdownComponent,
    TuiAppearance,
    TuiIcon,
  ],
  templateUrl: './menu-table.component.html',
  styleUrl: './menu-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MenuTableComponent {
  @Input() menus: Menu[] = [];
  @Input() columns: { id: string; label: string }[] = [];
  @Output() refreshMenus = new EventEmitter<void>();

  activeDropdownId: number | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalMenus: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['menus']) {
      this.totalMenus = this.menus.length; // Actualiza el total cuando cambian los menús
    }
  }

  get paginatedMenus(): Menu[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.menus.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalMenus / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  private readonly editDialog = tuiDialog(MenuEditDialogComponent, {
    dismissible: true,

    closeable: true,
  });
  private readonly deleteDialog = tuiDialog(MenuDeleteDialogComponent, {
    dismissible: true,
    closeable: true,
  });

  private readonly addDialog = tuiDialog(MenuAddDialogComponent, {
    dismissible: true,
    closeable: true,
  });

  protected toggleEditDialog(menu: Menu) {
    console.log('ID DEL MENU' + menu.id);
    this.editDialog(menu).subscribe({
      next: (result) => {
        this.refreshMenus.emit();
      },
      complete: () => {
        console.log('Dialog closed');
      },
    });
  }

  protected toggleDeleteDialog(menu: Menu) {
    this.deleteDialog(menu).subscribe({
      next: (result) => {
        this.refreshMenus.emit();
      },
      complete: () => {
        console.log('dialog closed');
      },
    });
  }

  protected toggleAddDialog() {
    this.addDialog(undefined).subscribe({
      next: (result) => {
        this.refreshMenus.emit();
      },
      complete: () => {
        console.log('dialog closed');
      },
    });
  }

  protected readonly MenuComponent = MenuComponent;
  protected readonly findComponent = findComponent;
  protected readonly Math = Math;
}
