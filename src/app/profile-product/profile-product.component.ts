import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Product} from '../../../interface/product';
import {AuthService} from '../../../service/auth/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile-product',
  templateUrl: './profile-product.component.html',
  styleUrls: ['./profile-product.component.scss']
})
export class ProfileProductComponent implements OnInit {
  /** Products collection from selected user */
  private userProductsCollection: AngularFirestoreCollection<Product>;
  /** Products array from selected user */
  userProduct: Product[] = [];

  /** State showing whether there are products */
  noProduct = true;

  constructor(private firestore: AngularFirestore, private auth: AuthService) {}

  /** Fetch products from backend to userProduct */
  ngOnInit(): void {
    this.firestore.collection<Product>('products',
        product => product.where('userId', '==', this.auth.currentuser.uid)
    )
    .valueChanges().subscribe(products => {
      this.userProduct = products;
      console.log(products);
      this.checkValid();
    });


  }

  /** Check whether there are products */
  private checkValid() {
    if (this.userProduct.length === 0) {
      this.noProduct = true;
    } else {
      this.noProduct = false;
    }
  }
}
