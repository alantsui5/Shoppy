import { Component } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { CartService } from "service/cart/cart.service";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "service/auth/auth.service";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
})
export class SummaryComponent {
  constructor(
    public msg: NzMessageService,
    public cartService: CartService,
    private router: Router,
    private db: AngularFirestore,
    private auth: AuthService
  ) {}

  cartToOrder() {
    this.cartService.items.forEach((item) => {
      this.db
        .collection("users")
        .doc(this.auth.currentuser.uid)
        .collection("orders")
        .add({ ...item, arrivalDate: this.arrivalDate() });
    });
  }
  arrivalDate() {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  }
  submit() {
    this.cartToOrder();
    this.msg.success("Checkout completed");
    this.router.navigate(["/"]);
    this.cartService.clearCart();
  }
}
