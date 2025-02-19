import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiIcon,
  TuiLabel,
  TuiNotification,
  TuiTextfield,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
  TuiTitle,
} from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiFieldErrorPipe,
  TuiFileLike,
  TuiFiles,
  TuiSegmented,
  TuiSwitch,
  TuiTooltip,
  tuiValidationErrorsProvider,
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../utils/utils';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiError,
    TuiFieldErrorPipe,
    TuiForm,
    TuiHeader,
    TuiIcon,
    TuiNotification,
    TuiSegmented,
    TuiSwitch,
    TuiTextfield,
    TuiTitle,
    TuiTooltip,
    TuiTextfieldDirective,
    TuiLabel,
    TuiTextfieldComponent,
    TuiAvatar,
    TuiFiles,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiValidationErrorsProvider({
      required: 'Este campo es obligatorio',
      email: 'Introduce un correo válido',
      minlength: 'La contraseña debe tener al menos 6 caracteres',
      mismatch: 'Las contraseñas no coinciden',
    }),
  ],
})
export default class RegisterComponent {
  protected readonly form = new FormGroup(
    {
      dni: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', Validators.required),
      avatar: new FormControl<TuiFileLike | null>(null),
    },
    {
      validators: passwordMatchValidator,
    },
  );

  imageUrl: string | ArrayBuffer | null = null;
  isImageSelected = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imageUrl = URL.createObjectURL(file);
      this.form.get('avatar')?.setValue(file);
      this.form.get('avatar')?.disable();
      this.isImageSelected = true;
      this.changeDetectorRef.detectChanges();
    }
  }

  removeImage(): void {
    this.imageUrl = null;
    this.form.get('avatar')?.setValue(null);
    this.form.get('avatar')?.enable();
    this.isImageSelected = false;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { dni, name, surname, email, password, confirmPassword } =
        this.form.value;

      if (password!.length < 6) {
        this.form.get('password')?.setErrors({ minlength: true });
        return;
      }

      if (password !== confirmPassword) {
        this.form.get('confirmPassword')?.setErrors({ mismatch: true });
        return;
      }

      this.authService.register(dni, name, surname, email, password).subscribe({
        next: () => {
          console.log('User registered');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Register error:', error);
          if (error.error.code === 'EMAIL_YA_EXISTENTE') {
            this.form
              .get('email')
              ?.setErrors({ backend: 'Este correo ya está en uso' });
          } else if (error.error.code === 'DNI_YA_EXISTENTE') {
            this.form
              .get('dni')
              ?.setErrors({ backend: 'Este DNI ya está registrado' });
          } else {
            this.form.setErrors({
              backend: 'Se ha producido un error. Intente de nuevo',
            });
          }
        },
      });
    }
  }
}
