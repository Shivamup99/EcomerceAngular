import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter();
  @Input() product: Product | undefined
  onAddtoCart(): void {
   this.addToCart.emit(this.product)
  }
}
