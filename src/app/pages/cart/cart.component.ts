import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart, CartItems } from 'src/app/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        name: 'Labro Dog',
        price: 150,
        quantity: 3,
        id: 1,
      },
      {
        product: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        name: 'Labro Dog',
        price: 150,
        quantity: 3,
        id: 2,
      },
      {
        product: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        name: 'Labro Dog',
        price: 150,
        quantity: 3,
        id: 3,
      },
    ],
  };
  dataSource: Array<CartItems> = [];
  displayedColums: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: any) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }
  getTotalPrice(items: Array<CartItems>): number {
    return this.cartService.getTotal(items);
  }
  clearAll(): void {
    this.cartService.clearCart();
  }
  onRemoveCart(item: CartItems): void {
    this.cartService.removeFromCart(item);
  }
  onAddQuantity(item: CartItems) {
    this.cartService.addToCart(item);
  }
  onRemoveQuantity(item:CartItems) {
    this.cartService.removeQuantity(item)
  }
  onCheckOut():void{

  }
}
