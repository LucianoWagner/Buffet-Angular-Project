import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import LoginComponent from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { 
        path: 'home', 
        component: HomeComponent,
        canActivate: [AuthGuard], // Protege la ruta home
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login por defecto
    { path: '**', redirectTo: '/login' }, // Redirige cualquier ruta desconocida a login
];

export const routerProviders = provideRouter(routes);   