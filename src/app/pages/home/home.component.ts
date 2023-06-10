import { ProductService } from './../../services/product.service';
import { Product } from 'src/app/models/product.model';
import { CartService } from './../../services/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
const ROWS_HEIGHT:{[id:number]:number} ={1:400, 3:335,4:350}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  count = '12';
  sort = 'desc';
  products: Array<Product> | undefined;
  productsSubscription: Subscription | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];
  category!: string;
  constructor(
    private _cartService: CartService,
    private _productService: ProductService
  ) {}
  ngOnInit(): void {
    this._getProducts();
  }
  _getProducts(): void {
    this.productsSubscription = this._productService
      ._getAllProduct(this.count, this.sort, this.category)
      .subscribe((_product: any) => {
        this.products = _product;
      });
  }

  onColumsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  onShowCategory(newcat: string): void {
    this.category = newcat.toString();
    this._getProducts();
  }
  onAddtoCart(product: Product): void {
    this._cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onItemCountChange(newcount: number): void {
    this.count = newcount.toString();
    this._getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this._getProducts();
  }
  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
