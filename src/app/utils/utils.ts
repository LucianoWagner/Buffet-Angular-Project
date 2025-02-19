import { Menu, MenuComponent } from '../models/menu.model';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function findComponent(componentsList: MenuComponent[], type: string) {
  return componentsList.find((component) => component.type === type);
}

export function findComponentList(
  componentsList: MenuComponent[],
  type: string,
) {
  return componentsList.filter((component) => component.type === type);
}

export function passwordMatchValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { mismatch: true };
}

export function passwordComplexityValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const password = control.value;

  // Example: Check for at least one uppercase letter, one lowercase letter, one number, and one special character
  const complexPasswordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  return complexPasswordPattern.test(password) ? null : { complexity: true };
}
