import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CartService } from 'service/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent {


  constructor(public msg: NzMessageService, public cartService: CartService,private router: Router) {}


  submit(){
    this.msg.success("Checkout completed");
    this.router.navigate(['/']);
    this.cartService.clearCart();

  }
}
