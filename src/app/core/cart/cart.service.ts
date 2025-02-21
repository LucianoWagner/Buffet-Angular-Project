import { Menu } from '../../models/menu.model';
import { Injectable, signal } from '@angular/core';

export interface CartItem {
  item: Menu;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cart';
  cart = signal<CartItem[]>(this.loadCart());

  constructor() {}

  addToCart(menu: Menu) {
    const cart = this.cart();
    const item = cart.find((cartItem) => cartItem.item.id === menu.id);
    if (item) {
      item.quantity++;
    } else {
      cart.push({ item: menu, quantity: 1 });
    }
    this.cart.set([...cart]);
    this.saveCart();
  }

  removeFromCart(menu: Menu) {
    const cart = this.cart();
    const item = cart.find((cartItem) => cartItem.item.id === menu.id);
    if (item) {
      item.quantity--;
      if (item.quantity === 0) {
        cart.splice(cart.indexOf(item), 1);
      }
      this.cart.set([...cart]);
    }

    this.saveCart();
  }

  getCartTotal() {
    return this.cart().reduce((acc, cartItem) => {
      return acc + cartItem.quantity;
    }, 0);
  }

  getCartTotalPrice() {
    return this.cart().reduce((acc, cartItem) => {
      return acc + cartItem.quantity * cartItem.item.price;
    }, 0);
  }

  clearCart() {
    this.cart.set([]);
    this.saveCart();
  }

  getCart() {
    return this.cart();
  }

  private saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart()));
  }

  private loadCart(): CartItem[] {
    const storedCart = localStorage.getItem(this.storageKey);
    return storedCart ? JSON.parse(storedCart) : [];
  }
}
