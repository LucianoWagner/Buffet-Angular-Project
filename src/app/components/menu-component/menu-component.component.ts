import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TuiTable } from '@taiga-ui/addon-table';
import {
  TuiAutoColorPipe,
  TuiButton,
  TuiIcon,
  TuiInitialsPipe,
  TuiTitle,
} from '@taiga-ui/core';
import {
  TuiBadge,
  TuiCheckbox,
  TuiChip,
  TuiRadioList,
  TuiStatus,
} from '@taiga-ui/kit';
import { TuiCell } from '@taiga-ui/layout';
import { MenuComponentService } from '../../core/menu/menu-component.service';
import { MenuComponent } from '../../models/menu.model';
import { MenuComponentTableComponent } from './menu-component-table/menu-component-table.component';

@Component({
  selector: 'app-menu-components',
  standalone: true,
  imports: [
    FormsModule,
    TuiAutoColorPipe,
    TuiBadge,
    TuiButton,
    TuiCell,
    TuiCheckbox,
    TuiChip,
    TuiIcon,
    TuiInitialsPipe,
    TuiRadioList,
    TuiStatus,
    TuiTable,
    TuiTitle,
    MenuComponentTableComponent,
  ],
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponentsComponent implements OnInit {
  menuComponents: MenuComponent[] = [];
  columns = [];

  constructor(private menuComponentService: MenuComponentService) {}

  ngOnInit(): void {
    this.fetchMenuComponents();
  }

  private fetchMenuComponents(): void {
    this.menuComponentService.getAllMenuComponents().subscribe({
      next: (menuComponents) => {
        this.menuComponents = menuComponents;
      },
    });
  }
}
