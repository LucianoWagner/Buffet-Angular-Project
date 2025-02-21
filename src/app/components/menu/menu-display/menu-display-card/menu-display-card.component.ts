import { Component, Input } from '@angular/core';
import { Menu } from '../../../../models/menu.model';
import { TuiAppearance, TuiButton, TuiIcon, TuiTitle } from '@taiga-ui/core';
import { TuiAvatar, TuiFade } from '@taiga-ui/kit';
import { TuiCardLarge, TuiCell, TuiHeader } from '@taiga-ui/layout';
import { TuiItem, TuiRepeatTimes } from '@taiga-ui/cdk';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { menuTypes } from '../../../../utils/consts';
import { findComponent } from '../../../../utils/utils';
import { enviorment } from '../../../../../enviorments/enviorments';
import { TuiGetColorPipe } from '@taiga-ui/addon-doc';
import { TuiCurrencyPipe } from '@taiga-ui/addon-commerce';

@Component({
  selector: 'app-menu-display-card',
  imports: [
    TuiAppearance,
    TuiAvatar,
    TuiButton,
    TuiCardLarge,
    TuiCell,
    TuiHeader,
    TuiRepeatTimes,
    TuiTitle,
    TuiItem,
    NgForOf,
    NgClass,
    TuiCurrencyPipe,
    TuiFade,
    TuiIcon,
    NgIf,
  ],
  templateUrl: './menu-display-card.component.html',
  styleUrl: './menu-display-card.component.css',
  standalone: true,
})
export class MenuDisplayCardComponent {
  @Input() menu: Menu | null = null;

  constructor() {}

  protected readonly menuTypes = menuTypes;
  protected readonly findComponent = findComponent;

  getImageSrc(filename: string | null | undefined): string | null {
    if (filename) {
      return `${enviorment.imagesUrl}/${filename}`;
    }
    return null;
  }

  protected readonly TuiGetColorPipe = TuiGetColorPipe;
}
