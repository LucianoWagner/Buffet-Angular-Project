import { Component } from '@angular/core';
import {AuthService} from '../../core/auth/auth.service';
import {Router} from '@angular/router';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

   navBarOptions = [
     {name: "Menus", href: "/menus"},
      {name: "Componentes", href: "/components"},
   ]

  isActive(href: string) {
    return this.router.url === href;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
