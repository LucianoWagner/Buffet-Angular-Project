import {NgForOf} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, Input, input} from '@angular/core';
import {TuiLet} from '@taiga-ui/cdk';
import type {TuiSizeL, TuiSizeS} from '@taiga-ui/core';
import {TuiButton, TuiDataList, TuiDialogService, TuiDropdown} from '@taiga-ui/core';
import {TuiDataListDropdownManager} from '@taiga-ui/kit';

@Component({
  selector: 'app-actions-dropdown',
  imports: [
    NgForOf,
    TuiButton,
    TuiDataList,
    TuiDataListDropdownManager,
    TuiDropdown,
    TuiLet,
  ],
  templateUrl: './actions-dropdown.component.html',
  styleUrl: './actions-dropdown.component.css',
  standalone: true,
})
export class ActionsDropdownComponent {
  @Input() componentId!: number;

  private readonly dialogs = inject(TuiDialogService);

  protected dropdownOpen = false;
  protected size: TuiSizeL | TuiSizeS = 's';

  protected readonly burgers = [
    'Classic',
    'Cheeseburger',
    'Royal Cheeseburger Quarterpounder',
  ];

  protected readonly drinks = ['Cola', 'Tea', 'Coffee', 'Slurm'];

  protected open = false;

  protected selectOption(item: string): void {
    this.dropdownOpen = false;
    this.dialogs.open(`You selected ${item}`).subscribe();
  }

}
