import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Menu } from '../../../models/menu.model';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import { MenuComponent } from '../menu.component';
import {TuiButton, TuiDropdownDirective} from '@taiga-ui/core';
import {ActionsDropdownComponent} from './actions-dropdown/actions-dropdown.component';

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

  activeDropdownId: number | null = null;

  constructor() {}

  toggleDropdown(id: number): void {
    this.activeDropdownId = this.activeDropdownId === id ? null : id;
  }

  findComponent(menu: Menu, type: string) {
    return menu.components.find((component) => component.type === type)?.name;
  }

  protected readonly MenuComponent = MenuComponent;
}
