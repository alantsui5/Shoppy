import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../interface/product'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CartService } from 'service/cart/cart.service';
import { NzAddOnModule, NzMessageService } from 'ng-zorro-antd';
import { User } from "../../../interface/user"
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  /** A selected product from backend */
  productDocument: AngularFirestoreDocument<Product>;

  /** Selected product observable from backend */
  product$: Observable<Product>;

  /** user id of seller */
  userId: string
  /** user picture of seller */
  userPic: string;

  /** user name of seller */
  userName: string;

  /** loading state */
  loading = true

  constructor(private route: ActivatedRoute, private db: AngularFirestore, private cartService: CartService, private message: NzMessageService) { }

  /** Parse route link and fetch product from selected product id */
  ngOnInit() {
    this.loading = true;
    this.route.paramMap.subscribe(params => {

      let id = params.get('productId')
      this.productDocument = this.db.doc<Product>('products/' + id);
      console.log(id);
      this.product$ = this.productDocument.valueChanges();
      this.product$.subscribe(product => {
        this.userId = product.userId;
        console.log(product)
        this.getUserNameFromId()
      });
    });
  }

  /** Get user name from current user id */
  getUserNameFromId() {
    this.db.doc<User>('users/' + this.userId).valueChanges().subscribe(user => {
      this.userName = user?.displayName;
      this.userPic = user?.photoURL;
    });
  }


  /** Add product to cart
   * @param {Product} product Add selected product to cart
   */
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.message.info('Your product has been added to the cart!');
  }
  ngAfterContentInit() {
    this.loading = false;
  }

}
