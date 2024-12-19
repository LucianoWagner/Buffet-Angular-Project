import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private authService: AuthService) {}

  hasPermission(permission: string): boolean {
    const permissions = this.authService.getPermissions();
    return permissions.includes(permission);
  }
}
