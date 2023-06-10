import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories: Array<string> | undefined;
  categorySubscription: Subscription | undefined;
  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this._getAllCategory();
  }
  _getAllCategory(): void {
    this.categorySubscription = this._productService
      ._getAllCategory()
      .subscribe((_item: any) => {
        this.categories = _item;
      });
  }
  onShowCategory(category: string): void {
    this.showCategory.emit(category);
    console.log('ssjsjj',category);
  }
  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}
