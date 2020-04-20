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
  productsCollection: AngularFirestoreCollection<Product>;
  products$: Observable<Product[]>
  userId: string
  constructor(private db: AngularFirestore, public auth: AuthService, public cartService:CartService, private message:NzMessageService) { }

  ngOnInit(): void {
    this.productsCollection = this.db.collection<Product>('products');
    this.products$ = this.productsCollection.valueChanges();
  }

  addToCart(product: Product) {
    console.log("Hi")
    this.cartService.addToCart(product);
    this.message.success('Your product has been added to the cart!');
  }

}
