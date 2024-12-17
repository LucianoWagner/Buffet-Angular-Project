import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean | UrlTree {
        if (this.authService.isLoggedIn()) {
            // Si el usuario está autenticado, permitir el acceso
            return true;
        } else {
            // Si no está autenticado, redirigir al login
            return this.router.parseUrl('/login');
        }
    }
}
