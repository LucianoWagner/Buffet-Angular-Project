import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}

    // Método para verificar si el usuario está autenticado
    isLoggedIn(): boolean {
        return !!localStorage.getItem('token'); // Devuelve true si hay un token
    }

    // Método para cerrar sesión
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
    }
}
