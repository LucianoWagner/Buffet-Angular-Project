import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  TuiAccordion,
  TuiAccordionItem,
  TuiAvatar,
  TuiCarousel,
} from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule } from '@taiga-ui/legacy';
import {
  TuiAppearance,
  TuiButton,
  TuiCalendar,
  TuiDateFormat,
  TuiIcon,
  TuiNotification,
  TuiTitle,
} from '@taiga-ui/core';
import { Menu } from '../../../models/menu.model';
import { CommonModule } from '@angular/common';
import { findComponent } from '../../../utils/utils';
import { TuiInputCard, TuiInputCardGroup } from '@taiga-ui/addon-commerce';
import {
  TuiCardLarge,
  TuiCardMedium,
  TuiCell,
  TuiHeader,
} from '@taiga-ui/layout';
import { TuiDay, TuiRepeatTimes } from '@taiga-ui/cdk';
import { MenuService } from '../../../core/menu/menu.service';
import { MenuDisplayCardComponent } from './menu-display-card/menu-display-card.component';

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
    TuiInputCardGroup,
    TuiInputCard,
    TuiCarousel,
    TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    TuiRepeatTimes,
    TuiAvatar,
    TuiCardMedium,
    TuiCell,
    TuiCalendar,
    MenuDisplayCardComponent,
    TuiNotification,
  ],
  templateUrl: './menu-display.component.html',
  styleUrls: ['./menu-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuDisplayComponent {
  constructor(private menuService: MenuService) {
    effect(() => {
      if (this.selectedDate() !== null) {
        const year = this.selectedDate()!.year;
        const month = String(this.selectedDate()!.month + 1).padStart(2, '0'); // Add leading zero
        const day = String(this.selectedDate()!.day).padStart(2, '0'); // Add leading zero
        const formattedDate = `${year}-${month}-${day}`;

        this.menuService.getByDate(formattedDate).subscribe({
          next: (menus) => {
            this.filteredMenus = menus;
          },
        });
      }
    });
  }

  selectedDate = signal<TuiDay | null>(TuiDay.currentLocal());
  protected readonly TuiDay = TuiDay;

  filteredMenus: Menu[] = [];

  protected onDayClick(day: TuiDay): void {
    this.selectedDate.set(day);
  }
}
