import { Component, OnInit } from '@angular/core';
import {Product} from '../../../interface/product';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../../../service/cart/cart.service';
import {NzMessageService} from 'ng-zorro-antd';
import {User} from 'firebase';

@Component({
  selector: 'app-profile-product-detail',
  templateUrl: './profile-product-detail.component.html',
  styleUrls: ['./profile-product-detail.component.scss']
})
export class ProfileProductDetailComponent implements OnInit {
  /** A selected product from backend */
  productDocument: AngularFirestoreDocument<Product>;
  /** Selected product observable from backend */
  product$: Observable<Product>;
  /** user id of seller */
  userId: string;
  /** user picture of seller */
  userPic: string;
  /** user name of seller */
  userName: string;
  /** loading state */
  loading = true;
  /** editing state */
  editState = false;

  itemToEdit: Product;
  productId: string;
  constructor(private route: ActivatedRoute, private message: NzMessageService,
              private firestore: AngularFirestore, private router: Router) { }

  /** get the product id from route links and fetch selected product from that id */
  ngOnInit() {
    this.loading = true;
    this.route.paramMap.subscribe(params => {

      const id = params.get('productId');
      this.productId = id;
      this.productDocument = this.firestore.doc<Product>('products/' + id);
      console.log(id);
      this.product$ = this.productDocument.valueChanges();
      this.product$.subscribe(product => {
        this.userId = product.userId;
        console.log(product);
        this.getUserNameFromId();
      });
    });
  }

  /** Get seller name from seller */
  getUserNameFromId() {
    this.firestore.doc<User>('users/' + this.userId).valueChanges().subscribe(user => {
      this.userName = user?.displayName;
      this.userPic = user?.photoURL;
    });
  }

  /** delete the product */
  deleteProduct() {
    this.firestore.collection('products').doc(this.productId).delete().then(r =>
      this.message.success('Delete Product Success')
    );
    this.router.navigate(['userproducts']).then(r => this.message.success('Go back to home'));
  }
}
