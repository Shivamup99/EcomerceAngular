import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItems } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });
  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItems): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }
    this.cart.next({ items });
    this._snackBar.open('item added successfully', 'ok', { duration: 3000 });
  }

  removeQuantity(item:CartItems){
    let itemForRemoval: CartItems | undefined
   let filterdItem = this.cart.value.items.map((_item)=>{
      if(_item.id===item.id){
        _item.quantity--;
        if(_item.quantity===0){
          itemForRemoval = _item
        }
      }
      return _item
    })
    if(itemForRemoval){
      this.removeFromCart(itemForRemoval)
    }
  }

  getTotal(items: Array<CartItems>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, currrent) => prev + currrent, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('cart is cleared', 'ok', { duration: 3000 });
  }

  removeFromCart(item:CartItems):void{
   const filterdItem = this.cart.value.items.filter((_item)=>_item.id !== item.id)
  this.cart.next({ items: filterdItem });
  this._snackBar.open('item deleted successfully','ok',{duration:3000});
  }
}
