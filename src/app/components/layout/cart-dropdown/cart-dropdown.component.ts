import { Component } from '@angular/core';
import { TuiAvatar, TuiBadge, TuiButtonGroup, TuiFade } from '@taiga-ui/kit';
import {
  TuiAppearance,
  TuiButton,
  TuiDropdown,
  TuiGroup,
  TuiTitle,
} from '@taiga-ui/core';
import { TuiActiveZone, TuiObscured } from '@taiga-ui/cdk';
import { CartService } from '../../../core/cart/cart.service';
import { TuiCardLarge, TuiCell } from '@taiga-ui/layout';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { Menu } from '../../../models/menu.model';

@Component({
  selector: 'app-cart-dropdown',
  imports: [
    TuiBadge,
    TuiButton,
    TuiDropdown,
    TuiObscured,
    TuiActiveZone,
    TuiCardLarge,
    TuiAppearance,
    TuiTitle,
    NgForOf,
    TuiCell,
    TuiAvatar,
    DatePipe,
    TuiButtonGroup,
    TuiGroup,
    NgIf,
    TuiFade,
  ],
  templateUrl: './cart-dropdown.component.html',
  styleUrl: './cart-dropdown.component.css',
  standalone: true,
})
export class CartDropdownComponent {
  constructor(private cartService: CartService) {}

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

  protected getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  protected getCartTotalPrice(): number {
    return this.cartService.getCartTotalPrice();
  }

  protected getCartItems() {
    return this.cartService.getCart();
  }

  protected addToCart(item: Menu) {
    this.cartService.addToCart(item);
  }

  protected removeFromCart(item: Menu) {
    this.cartService.removeFromCart(item);
  }
}
