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
  TuiButtonLoading,
  TuiFieldErrorPipe,
  TuiInputFiles,
  TuiInputFilesDirective,
  tuiValidationErrorsProvider,
} from '@taiga-ui/kit';
import { TuiSelectModule } from '@taiga-ui/legacy';
import { AsyncPipe, NgForOf } from '@angular/common';
import { TuiContext, tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import { BehaviorSubject } from 'rxjs';
import { MenuComponentService } from '../../../core/menu/menu-component.service';
import { menuTypes } from '../../../utils/consts';

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
    TuiButtonLoading,
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
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private menuComponentService: MenuComponentService,
  ) {}

  private readonly dialogs = inject(TuiDialogService);
  public readonly context =
    injectContext<TuiDialogContext<MenuComponent | undefined>>();

  protected readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    image: new FormControl<File | null>(null),
  });

  imageUrl: string | ArrayBuffer | null = null;
  isImageSelected = false;
  isSubmitting$ = new BehaviorSubject(false);

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

  @tuiPure
  protected stringify(
    items: readonly { label: string; value: string }[],
  ): TuiStringHandler<TuiContext<string>> {
    const map = new Map(items.map(({ label, value }) => [value, label]));
    return ({ $implicit }: TuiContext<string>) => map.get($implicit) || '';
  }

  closeDialog() {
    this.context.completeWith(undefined);
  }

  onSubmit() {
    this.isSubmitting$.next(true);
    const { name, type } = this.form.value;
    const image = this.form.get('image')?.value as File | null;
    this.menuComponentService
      .addMenuComponent({ name: name!, type: type!, image: image! })
      .subscribe({
        next: (menuComponent) => {
          this.isSubmitting$.next(false);
          this.context.completeWith(menuComponent);
        },
        error: (error) => {
          console.error('Error adding menu component:', error);
          this.isSubmitting$.next(false);
        },
      });
  }

  protected readonly menuTypes = menuTypes;
}
