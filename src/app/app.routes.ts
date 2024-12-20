import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import {LayoutComponent} from './components/layout/layout.component';
import LoginComponent from './components/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent ,
    canActivate: [AuthGuard], // Protege a este componente y a sus hijos
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
      },

    ],
  },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'login' }, // Redirect any unknown paths to 'login'
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login por defecto
];

export const routerProviders = provideRouter(routes);
