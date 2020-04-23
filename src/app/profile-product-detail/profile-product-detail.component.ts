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

  productDocument: AngularFirestoreDocument<Product>;
  product$: Observable<Product>;
  userId: string;
  userPic: string;
  userName: string;
  loading = true;
  editState = false;
  itemToEdit: Product;
  productId: string;
  constructor(private route: ActivatedRoute, private message: NzMessageService,
              private firestore: AngularFirestore, private router: Router) { }

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

  getUserNameFromId() {
    this.firestore.doc<User>('users/' + this.userId).valueChanges().subscribe(user => {
      this.userName = user?.displayName;
      this.userPic = user?.photoURL;
    });
  }

  deleteProduct() {
    this.firestore.collection('products').doc(this.productId).delete().then(r =>
      this.message.success('Delete Product Success')
    );
    this.router.navigate(['userproducts']).then(r => this.message.success('Go back to home'));
  }
}
