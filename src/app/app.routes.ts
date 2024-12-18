import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import  LoginComponent  from './components/login/login.component';
import { AppComponent } from './app.component';
import {LayoutComponent} from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent ,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },

    ],
  },
  {path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '' }, // Redirige cualquier ruta a 404
];

export const routerProviders = provideRouter(routes);
