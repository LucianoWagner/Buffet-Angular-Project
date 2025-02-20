import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
import { TuiSelectModule } from '@taiga-ui/legacy';
import { stringify } from 'postcss';
import { TuiContext, tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import { menuTypes } from '../../../utils/consts';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
  TuiAvatar,
  TuiFieldErrorPipe,
  TuiInputFiles,
  TuiInputFilesDirective,
} from '@taiga-ui/kit';
import { enviorment } from '../../../../enviorments/enviorments';
import { FileService } from '../../../core/file/file.service';
import { MenuComponentService } from '../../../core/menu/menu-component.service';

@Component({
  selector: 'app-menu-component-edit-dialog',
  imports: [
    FormsModule,
    TuiForm,
    ReactiveFormsModule,
    TuiTextfield,
    TuiError,
    TuiSelectModule,
    NgForOf,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiAvatar,
    TuiButton,
    TuiInputFiles,
    TuiInputFilesDirective,
    NgIf,
  ],
  templateUrl: './menu-component-edit-dialog.component.html',
  styleUrl: './menu-component-edit-dialog.component.css',
})
export class MenuComponentEditDialogComponent implements OnInit {
  @Output() refreshTable = new EventEmitter<void>();

  imageUrl: string | null = null;
  isImageSelected = false;

  constructor(
    private fileService: FileService,
    private menuComponentService: MenuComponentService,
  ) {}

  protected readonly dialogs = inject(TuiDialogService);
  public readonly context =
    injectContext<
      TuiDialogContext<MenuComponent | null, MenuComponent | null>
    >();

  protected readonly form = new FormGroup({
    name: new FormControl(this.context.data.name, Validators.required),
    type: new FormControl(this.context.data.type, Validators.required),
    image: new FormControl<File | null>(null),
  });

  @tuiPure
  protected stringify(
    items: readonly { label: string; value: string }[],
  ): TuiStringHandler<TuiContext<string>> {
    const map = new Map(items.map(({ label, value }) => [value, label]));
    return ({ $implicit }: TuiContext<string>) => map.get($implicit) || '';
  }

  protected readonly menuTypes = menuTypes;

  removeImage(): void {
    this.imageUrl = null;
    this.form.get('image')?.setValue(null);
    this.form.get('image')?.enable();
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imageUrl = URL.createObjectURL(file);
      this.form.get('image')?.setValue(file);
      this.form.get('image')?.disable();
    }
  }

  ngOnInit() {
    if (this.context.data.imageUrl) {
      this.fileService.getFile(this.context.data.imageUrl).subscribe({
        next: (blob) => {
          const file = new File([blob], this.context.data.imageUrl!, {
            type: blob.type,
          });
          this.imageUrl = `${enviorment.imagesUrl}/${this.context.data.imageUrl}`;
          this.form.get('image')?.setValue(file);
          this.form.get('image')?.disable();
        },
      });

      this.isImageSelected = true;
    }
  }

  closeDialog() {
    this.context.completeWith(null);
  }

  onSubmit() {
    const { name, type } = this.form.value;
    const image = this.form.get('image')?.value as File | null;
    this.menuComponentService
      .updateMenuComponent(this.context.data.id!, {
        name: name!,
        type: type!,
        image: image!,
      })
      .subscribe({
        next: (menuComponent) => {
          this.context.completeWith(menuComponent);
          this.refreshTable.emit();
        },
        error: (error) => {
          this.form.setErrors({ backend: error.message });
        },
      });
  }
}
