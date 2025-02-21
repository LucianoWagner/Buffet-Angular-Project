import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/auth/auth.service';
import { NgClass, NgForOf } from '@angular/common';
import { navBarItems } from '../../utils/consts';
import { TuiButton, TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { TuiActiveZone, TuiObscured } from '@taiga-ui/cdk';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    NgForOf,
    NgClass,
    TuiIcon,
    TuiButton,
    TuiDropdown,
    TuiObscured,
    TuiActiveZone,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  userEmail: string | null = null; // Variable para guardar el correo del usuario
  constructor(
    protected authService: AuthService,
    private router: Router,
  ) {}

  protected open = false;

  protected onClick(): void {
    this.open = !this.open;
  }

  protected onObscured(obscured: boolean): void {
    if (obscured) {
      this.open = false;
    }
  }

  protected onActiveZone(active: boolean): void {
    this.open = active && this.open;
  }

  isActive(href: string) {
    return this.router.url === href;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    initFlowbite();
    this.userEmail = this.authService.getUsername(); // Obtiene el email del usuario
  }

  protected readonly navBarItems = navBarItems;
}
