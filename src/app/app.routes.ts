import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import LoginComponent from './components/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';
import RegisterComponent from './components/register/register.component';
import { MenuComponentTableComponent } from './components/menu-component/menu-component-table/menu-component-table.component';
import { MenuComponentsComponent } from './components/menu-component/menu-component.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], // Protege a este componente y a sus hijos
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'menus',
        component: MenuComponent,
      },
      {
        path: 'components',
        component: MenuComponentsComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' }, // Redirect any unknown paths to 'login'
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login por defecto
];

export const routerProviders = provideRouter(routes);
