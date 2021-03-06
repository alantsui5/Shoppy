import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { Product } from 'interface/product';
import { AngularFirestore } from '@angular/fire/firestore';
import { CartService } from 'service/cart/cart.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {

  /**
   * Array of Recent products
   */
  slides: Product[];
  /**
   * Observable of array of Recent products
   */
  slides$: Observable<Product[]>;

  constructor(private db: AngularFirestore, private cartService: CartService, private message: NzMessageService) { }

  /**
   * Fetch Recent products and save to slides[] variable
   */
  ngOnInit(): void {
    this.slides$ = this.db.collection<Product>('products',
      (ref: any) => ref.orderBy('name').limit(4)
    ).valueChanges();
    this.slides$.subscribe(slides => this.slides = slides);
  }

  /**
   * Add a product to cart
   * @param {Product} product, the selected product
   */
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.message.info('Your product has been added to the cart!');
  }



}
