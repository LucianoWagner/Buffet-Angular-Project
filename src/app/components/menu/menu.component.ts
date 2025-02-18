import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuService } from '../../core/menu/menu.service';
import { MenuTableComponent } from './menu-table/menu-table.component';

import { NgIf } from '@angular/common';
import { Menu } from '../../models/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [MenuTableComponent, NgIf],
  standalone: true,
})
export class MenuComponent implements OnInit {
  menus: Menu[] = [];
  isLoading = true;
  errorMessage = '';
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

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.fetchMenus();
  }

  fetchMenus(): void {
    this.menuService.getAllMenus().subscribe({
      next: (menus) => {
        this.menus = menus;
        this.isLoading = false;
        console.log('Cantidad de menus: ' + this.menus.length);
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      },
    });
  }
}
