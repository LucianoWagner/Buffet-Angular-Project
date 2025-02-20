import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {Menu, MenuComponent} from '../../../models/menu.model';
import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTable } from '@taiga-ui/addon-table';
import {
  TuiAutoColorPipe,
  TuiButton,
  tuiDialog,
  TuiDropdown,
  TuiIcon,
  TuiInitialsPipe,
  TuiLink,
  TuiTitle,
} from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiBadge,
  TuiCheckbox,
  TuiChip,
  TuiItemsWithMore,
  TuiProgressBar,
  TuiRadioList,
  TuiStatus,
} from '@taiga-ui/kit';
import { TuiCell } from '@taiga-ui/layout';
import { MenuComponentAddDialogComponent } from '../menu-component-add-dialog/menu-component-add-dialog.component';

import {MenuEditDialogComponent} from '../../menu/menu-table/menu-edit-dialog/menu-edit-dialog.component';
import {MenuDeleteDialogComponent} from '../../menu/menu-table/menu-delete-dialog/menu-delete-dialog.component';
import {MenuAddDialogComponent} from '../../menu/menu-table/menu-add-dialog/menu-add-dialog.component';

@Component({
  standalone: true,
  selector: 'app-menu-component-table',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    TuiAutoColorPipe,
    TuiAvatar,
    TuiBadge,
    TuiButton,
    TuiCell,
    TuiCheckbox,
    TuiChip,
    TuiDropdown,
    TuiIcon,
    TuiInitialsPipe,
    TuiItemsWithMore,
    TuiLink,
    TuiProgressBar,
    TuiRadioList,
    TuiStatus,
    TuiTable,
    TuiTitle,
  ],
  templateUrl: './menu-component-table.component.html',
  styleUrls: ['./menu-component-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponentTableComponent {
  @Input() menuComponents: MenuComponent[] = [];
  @Input() columns: { id: string; label: string }[] = [];
  @Output() refreshMenuComponents = new EventEmitter<void>();


  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalMenuComponents: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['menuComponents']) {
      this.totalMenuComponents = this.menuComponents.length;
    }
  }

  get paginatedMenuComponents(): MenuComponent[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    console.log(this.menuComponents)
    return this.menuComponents.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalMenuComponents / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  private readonly addDialog = tuiDialog(MenuComponentAddDialogComponent, {
    dismissible: true,
    closeable: true,
  });

  private readonly editDialog = tuiDialog(MenuComponentEditDialogComponent, {
    dismissible: true,
    closeable: true,
  });

// private readonly editDialog = tuiDialog(MenuComponentEditDialogComponent, {
//   dismissible: true,
//   closeable: true,
// });
// private readonly deleteDialog = tuiDialog(MenuComponentDeleteDialogComponent, {
//   dismissible: true,
//   closeable: true,
// });

// protected toggleEditDialog(menu: MenuComponent) {
//   console.log('ID DEL MENU' + menu.id);
//   this.editDialog(menu).subscribe({
//     next: (result) => {
//       this.refreshMenuComponents.emit();
//     },
//     complete: () => {
//       console.log('Dialog closed');
//     },
//   });
// }

// protected toggleDeleteDialog(menu: MenuComponent) {
//   this.deleteDialog(menu).subscribe({
//     next: (result) => {
//       this.refreshMenuComponents.emit();
//     },
//     complete: () => {
//       console.log('dialog closed');
//     },
//   });
// }
  protected toggleAddDialog(): void {
    this.addDialog(undefined).subscribe({
      next: () => {
        this.refreshMenuComponents.emit();
      },
      complete: () => {
        console.log('Dialog closed');
    });
  }

  protected toggleEditDialog(menuComponent: MenuComponent): void {
    this.editDialog(menuComponent).subscribe({
      next: (menuComponent) => {
        // Do something
      },
    });
  }

  protected size = this.sizes[0];

  protected readonly data = [
    {
      checkbox: {
        title: 'Data point 1',
        subtitle: 'The first element',
      },
      title: {
        icon: '@tui.file',
        title: 'This is title',
        chip: 'Chip',
        subtitle: 'More information ・ Data',
      },
      cell: {
        name: 'John Cleese',
        email: 'silly@walk.uk',
      },
      status: {
        value: 'Success',
        color: 'var(--tui-status-positive)',
      },
      items: ['Some', 'items', 'displayed', 'here', 'and', 'can', 'overflow'],
      progress: 78,
      selected: false,
    },
    {
      checkbox: {
        title: 'Some title',
        subtitle: 'Some more text',
      },
      title: {
        icon: '@tui.heart',
        title: 'More info',
        chip: 'Chips can be here',
      },
      cell: {
        name: 'Eric Idle',
        email: 'cool@dude.com',
      },
      status: {
        value: 'Failure',
        color: 'var(--tui-status-negative)',
      },
      items: ['One', 'Item'],
      progress: 91,
      selected: false,
    },
    {
      checkbox: {
        title: 'And now',
        subtitle: 'Completely different',
      },
      title: {
        icon: '@tui.star',
        title: 'Wow',
      },
      cell: {
        name: 'Michael Palin',
        email: 'its@man.com',
      },
      status: {
        value: 'Pending',
        color: 'var(--tui-status-warning)',
      },
      items: [],
      progress: 32,
      selected: false,
    },
  ];

  protected get checked(): boolean | null {
    const every = this.data.every(({ selected }) => selected);
    const some = this.data.some(({ selected }) => selected);

    return every || (some && null);
  }

  protected onCheck(checked: boolean): void {
    this.data.forEach((item) => {
      item.selected = checked;
    });
  }
  protected readonly Math = Math;
}
