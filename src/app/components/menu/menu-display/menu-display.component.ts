import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiAccordion, TuiAccordionItem } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule } from '@taiga-ui/legacy';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { Menu } from '../../../models/menu.model';
import { CommonModule } from '@angular/common';
import { findComponent } from '../../../utils/utils';

@Component({
  standalone: true,
  selector: 'app-menu-display',
  imports: [
    CommonModule,
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    CurrencyPipe,
    TuiAccordion,
    TuiAccordionItem,
    TuiButton,
    TuiIcon,
    TuiInputModule,
    TuiSelectModule,
  ],
  templateUrl: './menu-display.component.html',
  styleUrls: ['./menu-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuDisplayComponent {
  @Input() menus: Menu[] = [];
  @Input() columns: { id: string; label: string }[] = [];
  @Output() refreshMenus = new EventEmitter<void>();

  protected readonly today = new Date();
  protected readonly nextTenDays = new Date();

  constructor() {
    this.nextTenDays.setDate(this.today.getDate() + 9);
  }

  get filteredMenus(): { date: string; menus: Menu[] }[] {
    const groupedMenus: { [key: string]: Menu[] } = {};

    this.menus.forEach((menu) => {
      const menuDate = this.convertToISODate(menu.date); // Aseguramos que la fecha sea en el formato correcto
      if (!menuDate) return;

      if (!groupedMenus[menuDate]) {
        groupedMenus[menuDate] = [];
      }
      groupedMenus[menuDate].push(menu);
    });

    // Convertir today y nextTenDays a formato 'yyyy-MM-dd', y asegurarnos de que no sean null
    const todayStr = this.convertToISODate(this.today.toISOString().split('T')[0]) || '';
    const nextTenDaysStr = this.convertToISODate(this.nextTenDays.toISOString().split('T')[0]) || '';


    console.log('Fechas de comparación:', todayStr, nextTenDaysStr);
    console.log('Menus agrupados:', groupedMenus);

    return Object.keys(groupedMenus)
      .filter((date) => {
        // Comparamos las fechas como cadenas
        return date >= todayStr && date <= nextTenDaysStr;
      })
      .map((date) => {
        // Usamos `toLocaleDateString` para formatear la fecha sin depender de DatePipe
        const formattedDate = this.formatDate(date);
        return {
          date: formattedDate || '',
          menus: groupedMenus[date],
        };
      });
  }

  // Función para convertir una fecha a formato 'yyyy-MM-dd'
  private convertToISODate(date: string): string | null {
    // Verifica si la fecha ya está en el formato 'yyyy-MM-dd'
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (regex.test(date)) return date;

    // Si no, intenta convertirlo de otros formatos como 'dd-MM-yyyy'
    const [day, month, year] = date.split('-');
    if (day && month && year) {
      return `${year}-${month}-${day}`;
    }
    return null; // Si no se puede convertir, retornamos null
  }

  // Función para formatear las fechas en formato 'dd-MM-yyyy'
  private formatDate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  protected readonly findComponent = findComponent;
}
