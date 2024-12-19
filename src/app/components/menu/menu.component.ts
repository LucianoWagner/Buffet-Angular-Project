import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Menu, MenuService } from '../../core/menu/menu.service';
import { MenuTableComponent } from './menu-table/menu-table.component';
import { MenuTableHeaderComponent } from './menu-table-header/menu-table-header.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [MenuTableComponent, MenuTableHeaderComponent, NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  menus: Menu[] = [];
  constructor(
    private menuService: MenuService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  columns = [
    {
      id: 'name',
      label: 'Nombre',
    },
    {
      id: 'price',
      label: 'Precio',
    },
    {
      id: 'stock',
      label: 'Stock',
    },
    {
      id: 'date',
      label: 'Fecha',
    },
    {
      label: 'Vegetariano',
      id: 'vegetarian',
    },
    {
      id: 'starter',
      label: 'Entrada',
    },
    {
      id: 'main',
      label: 'Plato principal',
    },
    {
      id: 'dessert',
      label: 'Postre',
    },
    {
      id: 'drink',
      label: 'Bebida',
    },
    {
      id: 'actions',
      label: 'Acciones',
    },
  ];

  ngOnInit() {
    this.menuService.getMenus().subscribe((menus: Menu[]) => {
      this.menus = menus;
      this.changeDetectorRef.detectChanges();
    });
  }

  fetchItems(): void {
    this.menuService.getMenus().subscribe((menus: Menu[]) => {
      this.menus = menus;
    });
  }
}
