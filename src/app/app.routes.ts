import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
    ],
  },
  { path: '**', redirectTo: 'home' }, // Redirige cualquier ruta desconocida a home
];

export const routerProviders = provideRouter(routes);
