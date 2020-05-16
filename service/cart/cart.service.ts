import { Injectable } from "@angular/core";
import { Product } from "../../interface/product";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
@Injectable({
  providedIn: "root",
})
export class CartService {
  itemObs: Observable<[]>;
  items = [];
  quantity = {};

  constructor(private db: AngularFirestore) {}

  addToCart(product: Product) {
    if (this.quantity[product.Id] > 0) {
      this.quantity[product.Id] += 1;
    } else {
      this.items.push(product);
      this.quantity[product.Id] = 1;
    }
  }
  getItems() {
    return this.items;
  }

  totalPrice(): number {
    let total = 0;
    this.items.forEach(
      (item) => (total += item.price * this.quantity[item.Id])
    );
    return total;
  }

  deleteFromCart(product: Product) {
    this.items = this.items.filter((item: Product) => {
      console.log(item.Id);
      console.log(product.Id);
      return item.Id !== product.Id;
    });
  }

  arrivalDate() {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  }

  cartToDb() {
    this.items.forEach((item) => {
      this.db
        .collection("orders")
        .add({ ...item, arrivalDate: this.arrivalDate() });
    });
  }

  clearCart() {
    this.cartToDb();
    this.items = [];
    return this.items;
  }
}
