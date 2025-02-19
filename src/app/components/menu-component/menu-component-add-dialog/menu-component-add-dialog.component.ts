import { Component, inject } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { MenuComponent } from '../../../models/menu.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu-component-add-dialog',
  imports: [],
  templateUrl: './menu-component-add-dialog.component.html',
  styleUrl: './menu-component-add-dialog.component.css',
})
export class MenuComponentAddDialogComponent {
  private readonly dialogs = inject(TuiDialogService);
  public readonly context =
    injectContext<TuiDialogContext<MenuComponent | undefined>>();

  protected readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    image: new FormControl<File | null>(null),
  });
}
