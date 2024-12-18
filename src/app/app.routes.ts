import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import LoginComponent from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard], // Protect the 'home' route
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect empty path to 'login'
  { path: '**', redirectTo: 'login' }, // Redirect any unknown paths to 'login'
];

export const routerProviders = provideRouter(routes);
