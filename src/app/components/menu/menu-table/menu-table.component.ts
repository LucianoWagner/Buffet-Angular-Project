import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Menu } from '../../../core/menu/menu.service';
import { NgForOf } from '@angular/common';
import { MenuComponent } from '../menu.component';

@Component({
  selector: 'app-menu-table',
  imports: [NgForOf],
  templateUrl: './menu-table.component.html',
  styleUrl: './menu-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuTableComponent {
  @Input() menus: Menu[] = [];
  @Input() columns: { id: string; label: string }[] = [];

  constructor() {}

  findComponent(menu: Menu, type: string) {
    return menu.components.find((component) => component.type === type)?.name;
  }

  protected readonly MenuComponent = MenuComponent;
}
