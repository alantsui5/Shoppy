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
  private userProductsCollection: AngularFirestoreCollection<Product>;
  userProduct: Product[] = [];
  noProduct = true;

  constructor(private firestore: AngularFirestore, private auth: AuthService) {}

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

  private checkValid() {
    if (this.userProduct.length === 0) {
      this.noProduct = true;
    } else {
      this.noProduct = false;
    }
  }
}
