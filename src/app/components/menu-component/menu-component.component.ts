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

interface MenuComponent {
  id: number;
  nombre: string;
  tipo: string;
}

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
  ],
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponentsComponent implements OnInit {
  protected readonly sizes = ['l', 'm', 's'] as const;
  protected size = this.sizes[0];
  protected data: MenuComponent[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMenuComponents();
  }

  private fetchMenuComponents(): void {
    this.http.get<MenuComponent[]>('/menu-components').subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Error fetching menu components', error);
      }
    );
  }
}
