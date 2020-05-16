import { Injectable } from '@angular/core';
import { Product } from '../../interface/product';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemObs: Observable<[]>;
  // The Cart array
  items = [];
  quantity = {};

  /**
   Perform Add to Cart
  @param {Product} product The Product to add to cart
  */
  addToCart(product: Product) {
    if (this.quantity[product.Id] > 0) {
      this.quantity[product.Id] += 1;
    } else {
      this.items.push(product);
      this.quantity[product.Id] = 1;
    }
  }

  /** Get user cart items
  */
  getItems() {
    return this.items;
  }

  /** Get total price of items in cart
  */
  totalPrice(): number {
    let total = 0;
    this.items.forEach(item => total += item.price * this.quantity[item.Id]);
    return total;
  }

  /**
   * Delete particular item in cart
   * @param {Product} product The Product to delete
   */
  deleteFromCart(product: Product) {
    this.items = this.items.filter((item: Product) => {
      console.log(item.Id);
      console.log(product.Id);
      return item.Id !== product.Id;
    }
    );

  }

  /**
   * Clear the cart
   */
  clearCart() {
    this.items = [];
    return this.items;
  }
  constructor() { }
}
