import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {Router, RouterOutlet} from '@angular/router';
import {initFlowbite} from 'flowbite';
import {AuthService} from '../../core/auth/auth.service';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, NgForOf, NgClass],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  navBarOptions = [
    {name: "Menus", href: "/menus", icon:"/menu-restaurant-icon.svg"},
    {name: "Componentes", href: "/components", icon: '/component-icon.svg'},
  ]

  isActive(href: string) {
    return this.router.url === href;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    initFlowbite();
  }

}
