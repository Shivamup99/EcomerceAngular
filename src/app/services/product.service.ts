import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

const BASE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  _getAllProduct(
    limit = '12',
    sort = 'desc',
    category?: string
  ): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${BASE_URL}/products${
        category?'/category/'+category:''
      }?sort=${sort}&limit=${limit}`
    );
  }

  _getAllCategory(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${BASE_URL}/products/categories`
    );
  }
}
