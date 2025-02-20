import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  TuiButton,
  TuiDialogContext,
  TuiDialogService,
  TuiError,
  TuiTextfield,
} from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { MenuComponent } from '../../../models/menu.model';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiForm } from '@taiga-ui/layout';
import {
  TuiAvatar,
  TuiFieldErrorPipe,
  TuiInputFiles,
  TuiInputFilesDirective,
  tuiValidationErrorsProvider,
} from '@taiga-ui/kit';
import { TuiSelectModule } from '@taiga-ui/legacy';
import { AsyncPipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-menu-component-add-dialog',
  imports: [
    FormsModule,
    TuiForm,
    ReactiveFormsModule,
    TuiTextfield,
    TuiError,
    TuiFieldErrorPipe,
    TuiSelectModule,
    NgForOf,
    AsyncPipe,
    TuiAvatar,
    TuiButton,
    TuiInputFiles,
    TuiInputFilesDirective,
  ],
  templateUrl: './menu-component-add-dialog.component.html',
  styleUrl: './menu-component-add-dialog.component.css',
  providers: [
    tuiValidationErrorsProvider({
      required: 'Este campo es obligatorio',
    }),
  ],
})
export class MenuComponentAddDialogComponent {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  private readonly dialogs = inject(TuiDialogService);
  public readonly context =
    injectContext<TuiDialogContext<MenuComponent | undefined>>();

  protected readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    image: new FormControl<File | null>(null),
  });
  menuTypes: { label: string; value: string }[] = [
    { label: 'Entrante', value: 'STARTER' },
    { label: 'Principal', value: 'MAIN_DISH' },
    { label: 'Postre', value: 'DESSERT' },
    { label: 'Bebida', value: 'DRINK' },
  ];

  imageUrl: string | ArrayBuffer | null = null;
  isImageSelected = false;

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imageUrl = URL.createObjectURL(file);
      this.form.get('image')?.setValue(file);
      this.form.get('image')?.disable();
      this.isImageSelected = true;
      this.changeDetectorRef.detectChanges();
    }
  }

  removeImage(): void {
    this.imageUrl = null;
    this.form.get('image')?.setValue(null);
    this.form.get('image')?.enable();
    this.isImageSelected = false;
  }
}
