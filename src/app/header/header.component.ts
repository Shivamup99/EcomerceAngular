import { Component, Input } from '@angular/core';
import { Cart, CartItems } from '../models/cart.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;
  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, next) => prev + next, 0);
  }
  constructor(private cartService: CartService) {}

  getTotalPrice(items: Array<CartItems>): number {
    return this.cartService.getTotal(items);
  }
  clearShoppingCart() {
    this.cartService.clearCart();
  }
}
