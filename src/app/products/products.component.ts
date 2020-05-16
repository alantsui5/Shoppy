import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interface/product'
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from 'service/auth/auth.service';
import { CartService } from 'service/cart/cart.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  /** Collection of all products */
  productsCollection: AngularFirestoreCollection<Product>;
  /** Collection of all products observable */
  products$: Observable<Product[]>
  /** current user Id */
  userId: string

  constructor(private db: AngularFirestore, public auth: AuthService, public cartService:CartService, private message:NzMessageService) { }

  /** Fetch products from products database */
  ngOnInit(): void {
    this.productsCollection = this.db.collection<Product>('products');
    this.products$ = this.productsCollection.valueChanges();
  }

  /** Add selected product to cart */
  addToCart(product: Product) {
    console.log("Hi")
    this.cartService.addToCart(product);
    this.message.success('Your product has been added to the cart!');
  }

}
