import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  TuiIcon, TuiLabel,
  TuiNotification,
  TuiTextfield, TuiTextfieldComponent, TuiTextfieldDirective,
  TuiTitle,
} from '@taiga-ui/core';
import {
  TuiFieldErrorPipe,
  TuiSegmented,
  TuiSwitch,
  TuiTooltip,
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  protected readonly form = new FormGroup({
    dni: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const {dni, name, surname, email, password, confirmPassword} = this.form.value;

      if (!dni || !name || !surname || !email || !password || !confirmPassword) {
        this.form.setErrors({backend: 'Todos los campos son obligatorios'});
        return;
      }

      if (password.length < 6) {
        this.form.get('password')?.setErrors({minlength: true});
        return;
      }

      if (password !== confirmPassword) {
        this.form.get('confirmPassword')?.setErrors({mismatch: true});
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
            this.form.get('email')?.setErrors({backend: 'Este correo ya está en uso'});
          } else if (error.error.code === 'DNI_YA_EXISTENTE') {
            this.form.get('dni')?.setErrors({backend: 'Este DNI ya está registrado'});
          } else {
            this.form.setErrors({backend: 'Se ha producido un error. Intente de nuevo'});
          }
        },
      });
    }
  }
}
