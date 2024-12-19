import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      console.log('User is authenticated');
      // Si el usuario está autenticado, permitir el acceso
      return true;
    }

    console.log('User is not authenticated');

    this.router.navigate(['/login']);
    return false;
  }
}
